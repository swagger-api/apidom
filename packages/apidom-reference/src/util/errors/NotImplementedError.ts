import CausedError from './CausedError';

class NotImplementedError extends CausedError {
  constructor(message = 'Not Implemented', options?: { cause?: Error }) {
    super(message, options);
  }
}

export default NotImplementedError;
