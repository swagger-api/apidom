import InvalidSelectorError from '../../util/errors/InvalidSelectorError';

// eslint-disable-next-line import/prefer-default-export
export class InvalidJsonPointerError extends InvalidSelectorError {
  constructor(pointer: string) {
    super(`Invalid $ref pointer "${pointer}". Pointers must begin with "#/"`);
  }
}
