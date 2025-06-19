type ErrorType = Record<
  string,
  {
    message: string;
    [key: string]: any;
  }
>;

export class ErrorWithStatus {
  status: number;
  message: string;

  constructor(message: string, status: number) {
    this.status = status;
    this.message = message;
  }
}

export default class EntityError extends ErrorWithStatus {
  errors: ErrorType;

  constructor({
    message = "Validation error",
    errors = {},
    status = 422,
  }: {
    message?: string;
    errors?: ErrorType;
    status?: number;
  }) {
    super(message, status);
    this.errors = errors;
  }
}
