class NotImplementedError extends Error {
  constructor(message = 'Not Implemented', options?: { cause?: Error }) {
    super(message, options);
  }
}

export default NotImplementedError;
