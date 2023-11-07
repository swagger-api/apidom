import { Element, StringElement } from 'minim';

import { IdentityManager } from '../../identity';
import type { IdentityManagerInstance } from '../../identity';
import { isPrimitiveElement } from '../../predicates';

/**
 * Plugin for decorating every semantic element in ApiDOM tree with UUID.
 */

type Predicates = {
  isPrimitiveElement: typeof isPrimitiveElement;
};

const plugin =
  ({ length = 6 } = {}) =>
  ({ predicates }: { predicates: Predicates }) => {
    let identityManager: IdentityManagerInstance | null;

    return {
      pre() {
        identityManager = IdentityManager({ length });
      },
      visitor: {
        enter<T extends Element>(element: T) {
          if (!predicates.isPrimitiveElement(element)) {
            (element as Element).id = new StringElement(identityManager!.generateId()); // eslint-disable-line no-param-reassign
          }
        },
      },
      post() {
        identityManager = null;
      },
    };
  };

export default plugin;
