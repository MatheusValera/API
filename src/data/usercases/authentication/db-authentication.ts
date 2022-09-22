import {
  HashComparer,
  Encrypter,
  Authentication,
  AuthenticationModel,
  UpdateAccessTokenRepository,
  LoadAccountByEmailRepository
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer
  private readonly encrypter: Encrypter
  private readonly updateAccessTokenRepository: UpdateAccessTokenRepository

  constructor (
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparer: HashComparer,
    Encrypter: Encrypter,
    updateAccessTokenRepository: UpdateAccessTokenRepository) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.encrypter = Encrypter
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account && await this.hashComparer.compare(authentication.password, account.password)) {
      const accessToken = await this.encrypter.encrypt(account.id)
      await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
      return accessToken
    }
    return null
  }
}
