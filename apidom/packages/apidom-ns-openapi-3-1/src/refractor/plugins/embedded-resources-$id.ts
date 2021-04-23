import { last } from 'ramda';
import { isNonEmptyString } from 'ramda-adjunct';

/**
 * Instead of actually resolving the $id in this plugin, we're annotating every Schema
 * with `inherited$id` meta property which contains ordered list of all $id values
 * intercepted before the current Schema and including the current Schema.
 *
 * The `inherited$id` meta property can be folded by tooling into single URI
 * from right to left using specialized URI resolution algorithm.
 */

// @ts-ignore
const plugin = ({ namespace }) => {
  const { Schema: SchemaElement, Array: ArrayElement } = namespace.elements;

  let ancestors: Array<typeof SchemaElement>;

  return {
    name: 'embedded-resources-$id',
    pre() {
      ancestors = [];
    },
    visitor: {
      SchemaElement: {
        enter(schemaElement: typeof SchemaElement) {
          // fetch this schema direct parent
          const parentSchema = last(ancestors);
          // fetch parent's inherited$id
          const inherited$id =
            parentSchema !== undefined
              ? parentSchema.getMetaProperty('inherited$id', []).clone()
              : new ArrayElement();

          // push current $id to inherited$id list
          const $id = schemaElement.$id?.toValue();

          // we're only interested in $ids that are non empty strings
          if (isNonEmptyString($id)) {
            inherited$id.push($id);
          }

          schemaElement.setMetaProperty('inherited$id', inherited$id);

          ancestors.push(schemaElement);
        },
        leave() {
          ancestors.pop();
        },
      },
    },
    post() {
      ancestors = [];
    },
  };
};

export default plugin;
