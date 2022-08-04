import { InvalidParamError } from '../../errors/errors'
import { EmailValidator } from '../../protocols/email-validator'
import { Validation } from './validation'

export class EmaildValidation implements Validation {
  private readonly field: string

  private readonly emailValidator: EmailValidator
  constructor (field: string, emailValidator: EmailValidator) {
    this.field = field
    this.emailValidator = emailValidator
  }

  validate (input: any): Error {
    if (!this.emailValidator.isValid(input[this.field])) {
      return new InvalidParamError(this.field)
    }
  }
}
