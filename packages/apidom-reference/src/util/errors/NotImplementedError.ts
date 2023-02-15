class NotImplementedError extends Error {
  constructor(message = 'Not Implemented', options?: { cause?: Error }) {
    super(message);
    this.cause = this.cause ?? options?.cause;
  }
}

export default NotImplementedError;
