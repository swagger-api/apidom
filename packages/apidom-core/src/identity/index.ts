import { Element, StringElement } from 'minim';
import stampit from 'stampit';
import ShortUniqueId from 'short-unique-id';

import ElementIdentityError from './errors/ElementIdentityError';
import { isElement, isStringElement } from '../predicates';

export interface IdentityManagerInstance<T extends Element = Element> {
  length: number;
  uuid: ShortUniqueId;
  identityMap: WeakMap<T, StringElement>;

  identify(this: IdentityManagerInstance<T>, element: T): StringElement;
  forget(this: IdentityManagerInstance<T>, element: T): boolean;
  generateId(this: IdentityManagerInstance<T>): string;
}

export const IdentityManager: stampit.Stamp<IdentityManagerInstance> = stampit({
  props: {
    uuid: null,
    length: null,
    identityMap: null,
  },
  init(this: IdentityManagerInstance, { length = 6 } = {}) {
    this.length = 6;
    this.uuid = new ShortUniqueId({ length });
    this.identityMap = new WeakMap();
  },
  methods: {
    identify<T extends Element>(this: IdentityManagerInstance, element: T): StringElement {
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
    },

    forget<T extends Element>(this: IdentityManagerInstance, element: T): boolean {
      if (this.identityMap.has(element)) {
        this.identityMap.delete(element);
        return true;
      }
      return false;
    },

    generateId(this: IdentityManagerInstance): string {
      return this.uuid.randomUUID();
    },
  },
});

export const defaultIdentityManager = IdentityManager({ length: 6 });
