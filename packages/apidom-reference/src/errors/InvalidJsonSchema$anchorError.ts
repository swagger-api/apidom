import JsonSchema$anchorError from './JsonSchema$anchorError';

class InvalidJsonSchema$anchorError extends JsonSchema$anchorError {
  constructor(anchor: string) {
    super(`Invalid JSON Schema $anchor "${anchor}".`);
  }
}

export default InvalidJsonSchema$anchorError;
