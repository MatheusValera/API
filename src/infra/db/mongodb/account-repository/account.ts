import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usercases/add-account'
import { MongoHelper } from '../helper/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(account)
    const accountR = result.ops[0]
    const { _id, ...accountWithourId } = accountR
    return Object.assign({}, accountWithourId, { id: _id })
  }
}
