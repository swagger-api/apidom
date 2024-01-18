import { Element, StringElement } from 'minim';
import ShortUniqueId from 'short-unique-id';

import ElementIdentityError from './errors/ElementIdentityError';
import { isElement, isStringElement } from '../predicates';

interface IdentityManagerOptions {
  length?: number;
}

export class IdentityManager<T extends Element = Element> {
  private readonly uuid: ShortUniqueId;

  private identityMap: WeakMap<T, StringElement>;

  constructor({ length = 6 }: IdentityManagerOptions = {}) {
    this.uuid = new ShortUniqueId({ length });
    this.identityMap = new WeakMap();
  }

  public identify(element: T): StringElement {
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
      isStringElement(element.meta.id) &&
      !element.meta.id.equals('')
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

  public forget(element: T): boolean {
    if (this.identityMap.has(element)) {
      this.identityMap.delete(element);
      return true;
    }
    return false;
  }

  public generateId(): string {
    return this.uuid.randomUUID();
  }
}

export const defaultIdentityManager = new IdentityManager({ length: 6 });
