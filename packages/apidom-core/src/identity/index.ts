import { Element, StringElement } from 'minim';
import ShortUniqueId from 'short-unique-id';

import ElementIdentityError from './errors/ElementIdentityError';
import { isElement, isStringElement } from '../predicates';

export class IdentityManager {
  protected readonly uuid: ShortUniqueId;

  protected readonly identityMap: WeakMap<Element, StringElement>;

  constructor({ length = 6 } = {}) {
    this.uuid = new ShortUniqueId({ length });
    this.identityMap = new WeakMap();
  }

  identify<T extends Element>(this: IdentityManager, element: T): StringElement {
    if (!isElement(element)) {
      throw new ElementIdentityError(
        'Cannot not identify the element. `element` is neither structurally compatible nor a subclass of an Element class.',
        {
          value: element,
        },
      );
    }

    // use already assigned identity
    if (
      element.meta.hasKey('id') &&
      isStringElement(element.meta.get('id')) &&
      !element.meta.get('id').equals('')
    ) {
      return element.id;
    }

    // assign identity in immutable way
    if (this.identityMap.has(element)) {
      return this.identityMap.get(element)!;
    }

    // return element identity
    const id = new StringElement(this.generateId());
    this.identityMap.set(element, id);
    return id;
  }

  forget<T extends Element>(element: T): boolean {
    if (this.identityMap.has(element)) {
      this.identityMap.delete(element);
      return true;
    }
    return false;
  }

  generateId() {
    return this.uuid.randomUUID();
  }
}

export const defaultIdentityManager = new IdentityManager();
