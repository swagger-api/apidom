class ParserError extends Error {
  constructor(message: string, cause: Error) {
    super(message);
    // @ts-ignore
    this.cause = cause;
  }
}

export default ParserError;
