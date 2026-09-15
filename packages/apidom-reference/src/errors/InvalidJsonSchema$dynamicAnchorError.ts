import JsonSchema$dynamicAnchorError from './JsonSchema$dynamicAnchorError.ts';

/**
 * @public
 */
class InvalidJsonSchema$dynamicAnchorError extends JsonSchema$dynamicAnchorError {
  constructor(anchor: string) {
    super(`Invalid JSON Schema $dynamicAnchor "${anchor}".`);
  }
}

export default InvalidJsonSchema$dynamicAnchorError;
