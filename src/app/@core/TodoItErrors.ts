export class DefaultError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class AuthError extends DefaultError {
  constructor(message: string) {
    super(message);
  }
}
