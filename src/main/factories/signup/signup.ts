import { DbAddAccount } from '../../../data/usercases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { SignUpController } from '../../../presentation/controllers/signup/signup'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeSignupValidation } from './signup-validation'

export const makeSignupController = (): Controller => {
  const encrypt = new BcryptAdapter(12)
  const accountMongo = new AccountMongoRepository()
  const db = new DbAddAccount(encrypt, accountMongo)
  const signupController = new SignUpController(db, makeSignupValidation())
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(signupController, logErrorRepository)
}
