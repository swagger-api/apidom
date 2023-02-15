class DereferenceError extends Error {
  constructor(message: string, options?: { cause?: Error }) {
    super(message, options);
    this.cause = this.cause ?? options?.cause;
  }
}

export default DereferenceError;
