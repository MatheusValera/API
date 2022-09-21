import { Hasher, AddAccountModel, AccountModel, AddAccountRepository } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (account: AddAccountModel): Promise<AccountModel> {
      return await new Promise(resolve => resolve({
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: 'hashed_password'
      }))
    }
  }
  return new AddAccountRepositoryStub()
}

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return await new Promise<string>(resolve => resolve('hashed_password'))
    }
  }
  return new HasherStub()
}

interface SutTypes {
  sut: DbAddAccount
  HasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const HasherStub = makeHasher()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(HasherStub, addAccountRepositoryStub)
  return {
    sut,
    HasherStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('should call Hasher with correct password', async () => {
    const { sut, HasherStub } = makeSut()
    const encryptSpy = jest.spyOn(HasherStub, 'hash')
    await sut.add({
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    })
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('should throw if Hasher throws', async () => {
    const { sut, HasherStub } = makeSut()
    jest.spyOn(HasherStub, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => {
      reject(new Error())
    }))
    const result = sut.add({
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    })
    await expect(result).rejects.toThrow()
  })

  test('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add({
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    })
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })

  test('should throw if Hasher throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => {
      reject(new Error())
    }))
    const result = sut.add({
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    })
    await expect(result).rejects.toThrow()
  })
  test('should return an account on sucess', async () => {
    const { sut } = makeSut()
    const result = await sut.add({
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    })
    await expect(result).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })
})
