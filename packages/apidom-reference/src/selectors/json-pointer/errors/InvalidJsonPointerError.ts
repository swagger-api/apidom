import InvalidSelectorError from '../../../util/errors/InvalidSelectorError';

export default class InvalidJsonPointerError extends InvalidSelectorError {
  constructor(pointer: string) {
    super(`Invalid $ref pointer "${pointer}". Pointers must begin with "/"`);
  }
}
