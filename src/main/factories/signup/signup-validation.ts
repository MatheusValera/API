
import { CompareFieldValidation } from '../../../presentation/helpers/validators/compare-fields-validation'
import { EmaildValidation } from '../../../presentation/helpers/validators/email-validation'
import { RequireFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../presentation/protocols/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeSignupValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['email', 'password', 'passwordConfirmation', 'name']) {
    validations.push(new RequireFieldValidation(field))
  }
  const email = new EmailValidatorAdapter()
  validations.push(new EmaildValidation('email', email))
  validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
  return new ValidationComposite(validations)
}
