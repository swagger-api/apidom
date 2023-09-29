import { Element } from '@swagger-api/apidom-core';

// eslint-disable-next-line import/prefer-default-export
export class AncestorLineage<T extends Element> extends Array<WeakSet<T>> {
  includesCycle(element: T) {
    return this.filter((ancestors) => ancestors.has(element)).length > 1;
  }

  includes(searchElement: WeakSet<T> | T, fromIndex?: number): boolean {
    if (searchElement instanceof WeakSet) {
      return super.includes(searchElement, fromIndex);
    }
    return this.some((ancestors) => ancestors.has(searchElement));
  }
}
