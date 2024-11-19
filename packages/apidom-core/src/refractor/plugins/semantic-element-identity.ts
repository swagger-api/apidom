import { Element } from 'minim';

import { IdentityManager } from '../../identity/index.ts';
import { isPrimitiveElement } from '../../predicates/index.ts';

/**
 * @public
 */
export type Predicates = {
  isPrimitiveElement: typeof isPrimitiveElement;
};

/**
 * Plugin for decorating every semantic element in ApiDOM tree with UUID.
 * @public
 */
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
