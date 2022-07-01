import { MissingParamError } from '../protocols/errors/missing-param-error'
import { HttpResponse } from '../protocols/http'

export const badRequest = (error: string): HttpResponse => ({
  statusCode: 400,
  body: new MissingParamError(error)
})
