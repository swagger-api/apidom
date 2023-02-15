class ResolverError extends Error {
  constructor(message: string, options?: { cause?: Error }) {
    super(message);
    this.cause = this.cause ?? options?.cause;
  }
}

export default ResolverError;
