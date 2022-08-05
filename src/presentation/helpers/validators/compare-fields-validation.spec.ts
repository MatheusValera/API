import { InvalidParamError } from '../../errors/errors'
import { CompareFieldValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldValidation => {
  return new CompareFieldValidation('any', 'any2')
}

describe('RequiredFields Validation', () => {
  test('should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const result = sut.validate({ any: 'any_name', any2: 'any2' })
    expect(result).toEqual(new InvalidParamError('any2'))
  })

  test('should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const result = sut.validate({ any: 'any_name', any2: 'any_name' })
    expect(result).toBeFalsy()
  })
})
