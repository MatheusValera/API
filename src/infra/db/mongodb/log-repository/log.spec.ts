import { Collection } from 'mongodb'
import { MongoHelper } from '../helper/mongo-helper'
import { LogMongoRepository } from './log'

describe('Log Mongo Repository', () => {
  let errorCollection: Collection
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  test('should create an error log on sucess', async () => {
    const sut = new LogMongoRepository()
    await sut.log('any_error')
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
