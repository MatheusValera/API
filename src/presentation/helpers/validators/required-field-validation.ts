import { MissingParamError } from '../../errors/errors'
import { Validation } from '../../protocols/validation'

export class RequireFieldValidation implements Validation {
  private readonly field: string
  constructor (field: string) {
    this.field = field
  }

  validate (input: any): Error {
    if (!input[this.field]) return new MissingParamError(this.field)
  }
}
