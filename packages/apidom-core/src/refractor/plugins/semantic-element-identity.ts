import { Element } from 'minim';

import { IdentityManager } from '../../identity';
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
    let identityManager: IdentityManager | null;

    return {
      pre() {
        identityManager = new IdentityManager({ length });
      },
      visitor: {
        enter<T extends Element>(element: T) {
          if (!predicates.isPrimitiveElement(element)) {
            (element as Element).id = identityManager!.identify(element); // eslint-disable-line no-param-reassign
          }
        },
      },
      post() {
        identityManager = null;
      },
    };
  };

export default plugin;
