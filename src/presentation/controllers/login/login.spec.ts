import { Authentication } from '../../../domain/usercases/authentication'
import { InvalidParamError, MissingParamError } from '../../errors/errors'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helper'
import { EmailValidator, HttpRequest } from '../signup/signup-protocols'
import { LoginController } from './login'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (email: string, password: string): Promise<string> {
      return 'any_token'
    }
  }
  return new AuthenticationStub()
}
interface SutTypes {
  sut: LoginController
  emailValidator: EmailValidator
  authentication: Authentication
}

const makeSut = (): SutTypes => {
  const authentication = makeAuthentication()
  const emailValidator = makeEmailValidator()
  const sut = new LoginController(emailValidator, authentication)
  return {
    sut,
    emailValidator,
    authentication
  }
}

describe('Login Controller', () => {
  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'password'
      }
    }
    const result = await sut.handle(httpRequest)
    expect(result).toEqual(badRequest(new MissingParamError('email')))
  })

  test('should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidator } = makeSut()
    jest.spyOn(emailValidator, 'isValid').mockReturnValueOnce(false)
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('should return 400 if no passowrd is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const result = await sut.handle(httpRequest)
    expect(result).toEqual(badRequest(new MissingParamError('password')))
  })

  test('should call EmailValidator with correct email', async () => {
    const { sut, emailValidator } = makeSut()
    const isValidSpy = jest.spyOn(emailValidator, 'isValid')
    await sut.handle(makeFakeRequest())
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidator } = makeSut()
    jest.spyOn(emailValidator, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(serverError(new Error()))
  })

  test('should call Authentication with correct values', async () => {
    const { sut, authentication } = makeSut()
    const authSpy = jest.spyOn(authentication, 'auth')
    await sut.handle(makeFakeRequest())
    expect(authSpy).toHaveBeenCalledWith('any_email@mail.com', 'any_password')
  })

  test('should return 401 if an invalid credentials are provided', async () => {
    const { sut, authentication } = makeSut()
    jest.spyOn(authentication, 'auth').mockReturnValueOnce(null)
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(unauthorized())
  })

  test('should return 500 if Authentication throws', async () => {
    const { sut, authentication } = makeSut()
    jest.spyOn(authentication, 'auth').mockImplementationOnce(() => {
      throw new Error()
    })
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(serverError(new Error()))
  })

  test('should return 200 if an valid credentials are provided', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(ok({ acessToken: 'any_token' }))
  })
})
