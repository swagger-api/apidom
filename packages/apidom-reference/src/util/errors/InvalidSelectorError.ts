class InvalidSelectorError extends Error {
  constructor(message: string, options?: { cause?: Error }) {
    super(message);
    this.cause = this.cause ?? options?.cause;
  }
}

export default InvalidSelectorError;
