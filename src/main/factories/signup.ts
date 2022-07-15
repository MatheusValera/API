import { DbAddAccount } from '../../data/usercases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignupController = (): Controller => {
  const email = new EmailValidatorAdapter()
  const encrypt = new BcryptAdapter(12)
  const accountMongo = new AccountMongoRepository()
  const db = new DbAddAccount(encrypt, accountMongo)
  const signupController = new SignUpController(email, db)
  return new LogControllerDecorator(signupController)
}
