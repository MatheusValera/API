export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super(`Invalid param: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}
export class ServerError extends Error {
  constructor () {
    super('Internal Server Error')
    this.name = 'ServerError'
  }
}
