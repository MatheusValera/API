
import { Validation } from '../../../presentation/protocols/validation'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
import { EmailValidation, RequireFieldValidation, ValidationComposite } from '../../../presentation/helpers/validators'

export const makeLoginValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequireFieldValidation(field))
  }
  const email = new EmailValidatorAdapter()
  validations.push(new EmailValidation('email', email))
  return new ValidationComposite(validations)
}
