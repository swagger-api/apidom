import JsonSchema$anchorError from './JsonSchema$anchorError.ts';

class InvalidJsonSchema$anchorError extends JsonSchema$anchorError {
  constructor(anchor: string) {
    super(`Invalid JSON Schema $anchor "${anchor}".`);
  }
}

export default InvalidJsonSchema$anchorError;
