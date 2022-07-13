import { MongoHelper } from '../helper/mongo-helper'
import { AccountMongoRepository } from './account'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('', () => {})

  test('Should return an account on sucess', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'valid_name',
      email: 'valid@example.com',
      password: 'password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('valid_name')
    expect(account.email).toBe('valid@example.com')
    expect(account.password).toBe('password')
  })
})
