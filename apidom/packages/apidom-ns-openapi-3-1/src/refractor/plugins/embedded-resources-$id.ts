import { last, defaultTo } from 'ramda';
import { isNonEmptyString } from 'ramda-adjunct';

// @ts-ignore
const plugin = ({ predicates, namespace }) => {
  const { Schema: SchemaElement } = namespace.elements;
  const { isStringElement, isSchemaElement } = predicates;

  let ancestors: Array<typeof SchemaElement>;

  return {
    name: 'embedded-resources-$id',
    pre() {
      ancestors = [];
    },
    visitor: {
      SchemaElement: {
        enter(schemaElement: typeof SchemaElement) {
          const parentSchema = last(ancestors);

          if (isSchemaElement(parentSchema) && !isStringElement(schemaElement.$id)) {
            // parent is available and no $id is defined, set parent $id
            const inherited$id = defaultTo(
              parentSchema.meta.get('inherited$id')?.toValue(),
              parentSchema.$id?.toValue(),
            );

            if (isNonEmptyString(inherited$id)) {
              schemaElement.setMetaProperty('inherited$id', inherited$id);
            }
          }

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
