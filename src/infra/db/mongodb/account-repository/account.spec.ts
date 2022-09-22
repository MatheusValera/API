import { Collection } from 'mongodb'
import { MongoHelper } from '../helper/mongo-helper'
import { AccountMongoRepository } from './account'

let accountCollection: Collection

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

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an account on add success', async () => {
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

  test('Should return an account on loadByEmail success', async () => {
    const sut = makeSut()
    await accountCollection.insertOne({
      name: 'valid_name',
      email: 'any_email@mail.com',
      password: 'password'
    })
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('valid_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('password')
  })

  test('Should return null if loadByEmail fails', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeFalsy()
  })

  test('Should update the account on updateAccessToken success', async () => {
    const sut = makeSut()
    const res = await accountCollection.insertOne({
      name: 'valid_name',
      email: 'any_email@mail.com',
      password: 'password'
    })
    const fakeAccount = res.ops[0]
    expect(fakeAccount.accessToken).toBeFalsy()
    await sut.updateAccessToken(res.ops[0]._id, 'any_token')
    const account = await accountCollection.findOne({ _id: fakeAccount._id })
    expect(account).toBeTruthy()
    expect(account.accessToken).toBe('any_token')
  })
})
