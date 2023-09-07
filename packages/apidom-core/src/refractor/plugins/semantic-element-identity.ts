import ShortUniqueId from 'short-unique-id';
import { Element, StringElement } from 'minim';

/**
 * Plugin for decorating every semantic element in ApiDOM tree with UUID.
 */

type Predicates = {
  isPrimitiveElement: (element: Element) => boolean;
};

const plugin =
  ({ length = 6 } = {}) =>
  ({ predicates }: { predicates: Predicates }) => {
    let uuid: any;

    return {
      pre() {
        uuid = new ShortUniqueId({ length });
      },
      visitor: {
        enter<T extends Element>(element: T) {
          if (!predicates.isPrimitiveElement(element)) {
            // eslint-disable-next-line no-param-reassign
            element.id = new StringElement(uuid.randomUUID());
          }
        },
      },
      post() {
        uuid = null;
      },
    };
  };

export default plugin;
