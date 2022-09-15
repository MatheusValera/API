
import { EmaildValidation } from '../../../presentation/helpers/validators/email-validation'
import { RequireFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeLoginValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequireFieldValidation(field))
  }
  const email = new EmailValidatorAdapter()
  validations.push(new EmaildValidation('email', email))
  return new ValidationComposite(validations)
}
