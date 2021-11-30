import { ValidationError } from "class-validator";

export class ErrorSaving extends Error {
    validationErrors: ValidationError[]

    constructor(errors) {
      super('error validating entity'); // (1)
      this.validationErrors = errors; // (2)
    }
  }