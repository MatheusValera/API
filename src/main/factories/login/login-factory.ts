import env from '../../config/env'
import { Controller } from '../../../presentation/protocols'
import { JwtAdapter } from '../../../infra/criptography/jwt/jwt-adapter'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt/bcrypt-adapter'
import { LoginController } from '../../../presentation/controllers/login/login'
import { DbAuthentication } from '../../../data/usercases/authentication/db-authentication'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { makeLoginValidation } from './login-validation'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'

export const makeLoginController = (): Controller => {
  const salt = 12
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepo = new AccountMongoRepository()
  const logErrorRepository = new LogMongoRepository()
  const dbAuth = new DbAuthentication(accountMongoRepo, bcryptAdapter, jwtAdapter, accountMongoRepo)
  const loginController = new LoginController(makeLoginValidation(), dbAuth)
  return new LogControllerDecorator(loginController, logErrorRepository)
}
