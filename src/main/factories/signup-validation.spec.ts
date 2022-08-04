import { CompareFieldValidation } from '../../presentation/helpers/validators/compare-fields-validation'
import { EmaildValidation } from '../../presentation/helpers/validators/email-validation'
import { RequireFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { EmailValidator } from '../../presentation/protocols/email-validator'
import { makeSignupValidation } from './signup-validation'

jest.mock('../../presentation/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignupValidation Factory', () => {
  test('should call Validation Composite with all validations', () => {
    makeSignupValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password', 'passwordConfirmation', 'name']) {
      validations.push(new RequireFieldValidation(field))
    }
    validations.push(new EmaildValidation('email', makeEmailValidator()))
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
