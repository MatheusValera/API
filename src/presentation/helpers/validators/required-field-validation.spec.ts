import { MissingParamError } from '../../errors/errors'
import { RequireFieldValidation } from './required-field-validation'

const makeSut = (): RequireFieldValidation => {
  return new RequireFieldValidation('any')
}

describe('RequiredFields Validation', () => {
  test('should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const result = sut.validate({ name: 'any_name' })
    expect(result).toEqual(new MissingParamError('any'))
  })

  test('should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const result = sut.validate({ any: 'any_name' })
    expect(result).toBeFalsy()
  })
})
