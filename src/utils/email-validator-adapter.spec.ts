import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  test('should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const result = sut.isValid('invalid_email@mail.com')
    expect(result).toBe(false)
  })

  test('should return true if validator returns true', () => {
    const sut = makeSut()
    const result = sut.isValid('valid_email@mail.com')
    expect(result).toBe(true)
  })

  test('should call validator with correct email', () => {
    const sut = makeSut()
    sut.isValid('any_email@mail.com')
    const spyEmail = jest.spyOn(validator, 'isEmail')
    expect(spyEmail).toHaveBeenCalledWith('any_email@mail.com')
  })
})
