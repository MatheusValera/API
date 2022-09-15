import { Validation } from '../../../presentation/protocols/validation'
import { EmailValidator } from '../../../presentation/protocols/email-validator'
import { makeSignupValidation } from './signup-validation'
import { CompareFieldValidation, EmailValidation, RequireFieldValidation, ValidationComposite } from '../../../presentation/helpers/validators'

jest.mock('../../../presentation/helpers/validators/validation-composite')

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
    validations.push(new EmailValidation('email', makeEmailValidator()))
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
