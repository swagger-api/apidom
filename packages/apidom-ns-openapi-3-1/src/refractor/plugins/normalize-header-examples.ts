import { cloneDeep } from '@swagger-api/apidom-core';

import HeaderElement from '../../elements/Header';
import ExampleElement from '../../elements/Example';
import { Predicates } from '../toolbox';

/**
 * Override of Schema.example and Schema.examples field inside the Header Objects.
 *
 * Header Object has two fixed fields:
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
        HeaderElement: {
          leave(headerElement: HeaderElement, key: any, parent: any, path: any, ancestors: any[]) {
            // skip visiting this Header Object
            if (ancestors.some(predicates.isComponentsElement)) {
              return;
            }

            // no Header.schema field present
            if (
              typeof headerElement.schema === 'undefined' ||
              !predicates.isSchemaElement(headerElement.schema)
            ) {
              return;
            }
            // Schema contains no example
            if (
              typeof headerElement.schema?.example === 'undefined' &&
              typeof headerElement.schema?.examples === 'undefined'
            ) {
              return;
            }

            /**
             * Header.examples and Schema.examples have preferences over the older
             * and deprected `example` field.
             */
            if (
              typeof headerElement.examples !== 'undefined' &&
              predicates.isObjectElement(headerElement.examples)
            ) {
              // @ts-ignore
              const examples = headerElement.examples.map((example: ExampleElement) => {
                return cloneDeep.safe(example.value);
              });

              if (typeof headerElement.schema.examples !== 'undefined') {
                headerElement.schema.set('examples', examples);
              }
              if (typeof headerElement.schema.example !== 'undefined') {
                headerElement.schema.set('example', examples);
              }
              return;
            }

            /**
             * Handle deprecated `example` field.
             */
            if (typeof headerElement.example !== 'undefined') {
              if (typeof headerElement.schema.examples !== 'undefined') {
                headerElement.schema.set('examples', [cloneDeep(headerElement.example)]);
              }
              if (typeof headerElement.schema.example !== 'undefined') {
                headerElement.schema.set('example', cloneDeep(headerElement.example));
              }
            }
          },
        },
      },
    };
  };
/* eslint-enable */

export default plugin;
