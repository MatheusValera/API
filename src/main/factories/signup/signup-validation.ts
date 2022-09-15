
import { Validation } from '../../../presentation/protocols/validation'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
import { CompareFieldValidation, EmailValidation, RequireFieldValidation, ValidationComposite } from '../../../presentation/helpers/validators'

export const makeSignupValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['email', 'password', 'passwordConfirmation', 'name']) {
    validations.push(new RequireFieldValidation(field))
  }
  const email = new EmailValidatorAdapter()
  validations.push(new EmailValidation('email', email))
  validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
  return new ValidationComposite(validations)
}
