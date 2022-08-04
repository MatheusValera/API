import { CompareFieldValidation } from '../../presentation/helpers/validators/compare-fields-validation'
import { RequireFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { makeSignupValidation } from './signup-validation'

jest.mock('../../presentation/helpers/validators/validation-composite')

describe('SignupValidation Factory', () => {
  test('should call Validation Composite with all validations', () => {
    makeSignupValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password', 'passwordConfirmation', 'name']) {
      validations.push(new RequireFieldValidation(field))
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
