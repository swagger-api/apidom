import { last, defaultTo } from 'ramda';

// @ts-ignore
const plugin = ({ predicates, namespace }) => {
  const {
    OpenApi3_1: OpenApi3_1Element,
    JsonSchemaDialect: JsonSchemaDialectElement,
    Schema: SchemaElement,
  } = namespace.elements;
  const { isStringElement, isSchemaElement, isJsonSchemaDialectElement } = predicates;

  let ancestors: Array<typeof SchemaElement>;
  let jsonSchemaDialect: typeof JsonSchemaDialectElement;

  return {
    name: 'embedded-resources-$schema',
    pre() {
      ancestors = [];
    },
    visitor: {
      OpenApi3_1Element(openApiElement: typeof OpenApi3_1Element) {
        if (isJsonSchemaDialectElement(openApiElement.jsonSchemaDialect)) {
          jsonSchemaDialect = openApiElement.jsonSchemaDialect;
        } else {
          jsonSchemaDialect = JsonSchemaDialectElement.default;
        }
      },

      SchemaElement: {
        enter(schemaElement: typeof SchemaElement) {
          const parentSchema = last(ancestors);

          if (!isSchemaElement(parentSchema) && !isStringElement(schemaElement.$schema)) {
            // no parent available and no $schema is defined, set default jsonSchemaDialect
            schemaElement.setMetaProperty('inherited$schema', jsonSchemaDialect.toValue());
          } else if (isSchemaElement(parentSchema) && !isStringElement(schemaElement.$schema)) {
            // parent is available and no $schema is defined, set parent $schema
            const inherited$schema = defaultTo(
              parentSchema.meta.get('inherited$schema'),
              parentSchema.$schema,
            );
            schemaElement.setMetaProperty('inherited$schema', inherited$schema);
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
      jsonSchemaDialect = undefined;
    },
  };
};

export default plugin;
