import { cloneDeep } from '@swagger-api/apidom-core';

import ParameterElement from '../../elements/Parameter';
import ExampleElement from '../../elements/Example';
import { Predicates } from '../toolbox';

/**
 * Override of Schema.example and Schema.examples field inside the Parameter Objects.
 *
 * Parameter Object has two fixed fields:
 *  - `example` of type `Any`
 *  - `examples` of type `Map[string, Example Object | Reference Object]`
 *
 * OpenAPI 3.1 specification excerpt that defines the override behavior:
 *
 * The example value SHALL override the example provided by the schema.
 * Furthermore, if referencing a schema that contains an example, the examples value SHALL override the example provided by the schema.
 */
/* eslint-disable no-param-reassign */
const plugin =
  () =>
  ({ predicates }: { predicates: Predicates }) => {
    return {
      visitor: {
        ParameterElement: {
          leave(
            parameterElement: ParameterElement,
            key: any,
            parent: any,
            path: any,
            ancestors: any[],
          ) {
            // skip visiting this Parameter Object
            if (ancestors.some(predicates.isComponentsElement)) {
              return;
            }

            // no Parameter.schema field present
            if (
              typeof parameterElement.schema === 'undefined' ||
              !predicates.isSchemaElement(parameterElement.schema)
            ) {
              return;
            }
            // Schema contains no example
            if (
              typeof parameterElement.schema?.example === 'undefined' &&
              typeof parameterElement.schema?.examples === 'undefined'
            ) {
              return;
            }

            /**
             * Parameter.examples and Schema.examples have preferences over the older
             * and deprected `example` field.
             */
            if (
              typeof parameterElement.examples !== 'undefined' &&
              predicates.isObjectElement(parameterElement.examples)
            ) {
              // @ts-ignore
              const examples = parameterElement.examples.map((example: ExampleElement) => {
                return cloneDeep.safe(example.value);
              });

              if (typeof parameterElement.schema.examples !== 'undefined') {
                parameterElement.schema.set('examples', examples);
              }
              if (typeof parameterElement.schema.example !== 'undefined') {
                parameterElement.schema.set('example', examples);
              }
              return;
            }

            /**
             * Handle deprecated `example` field.
             */
            if (typeof parameterElement.example !== 'undefined') {
              if (typeof parameterElement.schema.examples !== 'undefined') {
                parameterElement.schema.set('examples', [cloneDeep(parameterElement.example)]);
              }
              if (typeof parameterElement.schema.example !== 'undefined') {
                parameterElement.schema.set('example', cloneDeep(parameterElement.example));
              }
            }
          },
        },
      },
    };
  };
/* eslint-enable */

export default plugin;
