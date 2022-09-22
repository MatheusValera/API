import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await new Promise(resolve => resolve('any_token'))
  }
}))

const makeSut = (): any => {
  const sut = new JwtAdapter('secret')
  return { sut }
}

describe('JWT Adapter', () => {
  test('should call sign with correct values', async () => {
    const { sut } = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toBeCalledWith({ id: 'any_id' }, 'secret')
  })

  test('should return a token on sign success', async () => {
    const { sut } = makeSut()
    const result = await sut.encrypt('any_id')
    expect(result).toBe('any_token')
  })

  test('should throw if sign throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })
    const result = sut.encrypt('any_id')
    await expect(result).rejects.toThrow()
  })
})
