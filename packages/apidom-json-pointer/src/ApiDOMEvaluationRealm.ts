import {
  EvaluationRealm,
  JSONPointerIndexError,
  JSONPointerKeyError,
} from '@swaggerexpert/json-pointer';
import {
  isArrayElement,
  isObjectElement,
  ArrayElement,
  ObjectElement,
} from '@swagger-api/apidom-core';

/**
 * JSON Pointer evaluation realm for ApiDOM elements.
 * @public
 */
class ApiDOMEvaluationRealm extends EvaluationRealm {
  public readonly name = 'apidom';

  // eslint-disable-next-line class-methods-use-this
  public isArray(node: unknown): node is ArrayElement {
    return isArrayElement(node);
  }

  // eslint-disable-next-line class-methods-use-this
  public isObject(node: unknown): node is ObjectElement {
    return isObjectElement(node);
  }

  public sizeOf(node: unknown): number {
    if (this.isArray(node) || this.isObject(node)) {
      return node.length;
    }
    return 0;
  }

  public has(node: unknown, referenceToken: string): boolean {
    if (this.isArray(node)) {
      const index = Number(referenceToken);
      // eslint-disable-next-line no-bitwise
      const indexUint32 = index >>> 0;

      if (index !== indexUint32) {
        throw new JSONPointerIndexError(
          `Invalid array index "${referenceToken}": index must be an unsinged 32-bit integer`,
          {
            referenceToken,
            currentValue: node,
            realm: this.name,
          },
        );
      }

      return indexUint32 < this.sizeOf(node);
    }
    if (this.isObject(node)) {
      const keys = node.keys();
      const uniqueKeys = new Set(keys);

      if (keys.length !== uniqueKeys.size) {
        throw new JSONPointerKeyError(
          `Object key "${referenceToken}" is not unique — JSON Pointer requires unique member names`,
          {
            referenceToken,
            currentValue: node,
            realm: this.name,
          },
        );
      }

      return node.hasKey(referenceToken);
    }
    return false;
  }

  public evaluate<T = unknown>(node: unknown, referenceToken: string): T {
    if (this.isArray(node)) {
      return node.get(Number(referenceToken)) as T;
    }
    return (node as ObjectElement).get(referenceToken) as T;
  }
}

export default ApiDOMEvaluationRealm;
