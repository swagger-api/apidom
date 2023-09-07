import ShortUniqueId from 'short-unique-id';
import { Element, StringElement } from 'minim';

/**
 * Plugin for decorating every element in ApiDOM tree with UUID.
 */

const plugin =
  ({ length = 6 } = {}) =>
  () => {
    let uuid: any;

    return {
      pre() {
        uuid = new ShortUniqueId({ length });
      },
      visitor: {
        enter<T extends Element>(element: T) {
          // eslint-disable-next-line no-param-reassign
          element.id = new StringElement(uuid.randomUUID());
        },
      },
      post() {
        uuid = null;
      },
    };
  };

export default plugin;
