export default class DomainError extends Error {
  readonly message: string;

  constructor(message: string) {
    super();
    this.message = message;
  }
}
