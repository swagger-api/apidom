import { Element, isElement } from '@swagger-api/apidom-core';

// eslint-disable-next-line import/prefer-default-export
export class AncestorLineage<T extends Element> extends Array<Set<T>> {
  includesCycle(element: T) {
    return this.filter((ancestors) => ancestors.has(element)).length > 1;
  }

  includes(searchElement: Set<T> | T, fromIndex?: number): boolean {
    if (searchElement instanceof Set) {
      return super.includes(searchElement, fromIndex);
    }
    return this.some((ancestors) => ancestors.has(searchElement));
  }

  findItem(predicate: (item: T) => boolean): T | undefined {
    for (const set of this) {
      for (const item of set) {
        if (isElement(item) && predicate(item)) {
          return item;
        }
      }
    }
    return undefined;
  }
}
