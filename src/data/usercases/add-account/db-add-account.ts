import {
  AccountModel, AddAccount, AddAccountModel,
  Hasher, AddAccountRepository
} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly Hasher: Hasher

  private readonly addAccountRepository: AddAccountRepository

  constructor (Hasher: Hasher, addAccountRepository: AddAccountRepository) {
    this.Hasher = Hasher
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashPassword = await this.Hasher.hash(accountData.password)
    const resultAccount = await this.addAccountRepository.add(Object.assign({}, accountData,
      { password: hashPassword }))
    return resultAccount
  }
}
