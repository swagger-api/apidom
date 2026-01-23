import { Element, cloneDeep } from '@swagger-api/apidom-core';

import HeaderElement from '../../../elements/Header.ts';
import ExampleElement from '../../../elements/Example.ts';
import type { Toolbox } from '../../toolbox.ts';
import OpenApi3_2Element from '../../../elements/OpenApi3-2.ts';
import NormalizeStorage from './NormalizeStorage.ts';

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
 *
 * NOTE: this plugin is idempotent
 * @public
 */

export interface PluginOptions {
  storageField?: string;
}

/**
 * @public
 */
const plugin =
  ({ storageField = 'x-normalized' }: PluginOptions = {}) =>
  (toolbox: Toolbox) => {
    const { predicates, ancestorLineageToJSONPointer } = toolbox;
    let storage: NormalizeStorage | undefined;

    return {
      visitor: {
        OpenApi3_2Element: {
          enter(element: OpenApi3_2Element) {
            storage = new NormalizeStorage(element, storageField, 'header-examples');
          },
          leave() {
            storage = undefined;
          },
        },
        HeaderElement: {
          leave(
            headerElement: HeaderElement,
            key: string | number,
            parent: Element | undefined,
            path: (string | number)[],
            ancestors: [Element | Element[]],
          ) {
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

            const headerJSONPointer = ancestorLineageToJSONPointer([
              ...ancestors,
              parent!,
              headerElement,
            ]);

            // skip visiting this Header Object if it's already normalized
            if (storage!.includes(headerJSONPointer)) {
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
                storage!.append(headerJSONPointer);
              }
              if (typeof headerElement.schema.example !== 'undefined') {
                headerElement.schema.set('example', examples[0]);
                storage!.append(headerJSONPointer);
              }
              return;
            }

            /**
             * Handle deprecated `example` field.
             */
            if (typeof headerElement.example !== 'undefined') {
              if (typeof headerElement.schema.examples !== 'undefined') {
                headerElement.schema.set('examples', [cloneDeep(headerElement.example)]);
                storage!.append(headerJSONPointer);
              }
              if (typeof headerElement.schema.example !== 'undefined') {
                headerElement.schema.set('example', cloneDeep(headerElement.example));
                storage!.append(headerJSONPointer);
              }
            }
          },
        },
      },
    };
  };

export default plugin;
