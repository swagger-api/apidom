import { Element, StringElement } from 'minim';

import { IdentityManager } from '../../identity';

/**
 * Plugin for decorating every element in ApiDOM tree with UUID.
 */

const plugin =
  ({ length = 6 } = {}) =>
  () => {
    let identityManager: IdentityManager | null;

    return {
      pre() {
        identityManager = IdentityManager({ length });
      },
      visitor: {
        enter<T extends Element>(element: T) {
          element.id = new StringElement(identityManager!.generateId()); // eslint-disable-line no-param-reassign
        },
      },
      post() {
        identityManager = null;
      },
    };
  };

export default plugin;
