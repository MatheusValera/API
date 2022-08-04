import { Validation } from './validation'

export class ValidationComposite implements Validation {
  private readonly validations: Validation[]
  constructor (validations: Validation[]) {
    this.validations = validations
  }

  validate (input: any): Error {
    for (const valdation of this.validations) {
      const error = valdation.validate(input)
      if (error) { return error }
    }
  }
}
