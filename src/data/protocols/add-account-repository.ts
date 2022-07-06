import { AccountModel, AddAccountModel } from '../usercases/add-account/db-add-account-protocols'

export interface AddAccountRepository {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
