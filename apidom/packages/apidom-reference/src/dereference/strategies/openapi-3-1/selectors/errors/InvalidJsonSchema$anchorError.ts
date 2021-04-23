import InvalidSelectorError from '../../../../../util/errors/InvalidSelectorError';

export default class InvalidJsonSchema$anchorError extends InvalidSelectorError {
  constructor(anchor: string) {
    super(`Invalid JSON Schema $anchor "${anchor}".`);
  }
}
