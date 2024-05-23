import { Element, ArrayElement, toValue, cloneDeep } from '@swagger-api/apidom-core';

import HeaderElement from '../../elements/Header';
import ExampleElement from '../../elements/Example';
import type { Toolbox } from '../toolbox';
import OpenApi3_1Element from '../../elements/OpenApi3-1';

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
 */
type JSONPointer = string;
type JSONPointerTokens = string[];

interface PluginOptions {
  scope?: JSONPointer | JSONPointerTokens;
  storageField?: string;
}

/* eslint-disable no-param-reassign */
const plugin =
  ({ scope = '/', storageField = 'x-normalized-header-examples' }: PluginOptions = {}) =>
  (toolbox: Toolbox) => {
    const { predicates, ancestorLineageToJSONPointer, compileJSONPointerTokens } = toolbox;
    const scopeJSONPointer = Array.isArray(scope) ? compileJSONPointerTokens(scope) : scope;
    let storage: ArrayElement | undefined;

    return {
      visitor: {
        OpenApi3_1Element: {
          enter(element: OpenApi3_1Element) {
            // initialize the normalized storage
            storage = element.get(storageField);
            if (!predicates.isArrayElement(storage)) {
              storage = new ArrayElement();
              element.set(storageField, storage);
            }
          },
          leave(element: OpenApi3_1Element) {
            // make items in storage unique and release it
            storage = new ArrayElement(Array.from(new Set(toValue(storage))));
            element.set(storageField, storage);
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

            // skip visiting this Header Object if we're outside the assigned scope
            if (!headerJSONPointer.startsWith(scopeJSONPointer)) {
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
                storage!.push(headerJSONPointer);
              }
              if (typeof headerElement.schema.example !== 'undefined') {
                headerElement.schema.set('example', examples[0]);
                storage!.push(headerJSONPointer);
              }
              return;
            }

            /**
             * Handle deprecated `example` field.
             */
            if (typeof headerElement.example !== 'undefined') {
              if (typeof headerElement.schema.examples !== 'undefined') {
                headerElement.schema.set('examples', [cloneDeep(headerElement.example)]);
                storage!.push(headerJSONPointer);
              }
              if (typeof headerElement.schema.example !== 'undefined') {
                headerElement.schema.set('example', cloneDeep(headerElement.example));
                storage!.push(headerJSONPointer);
              }
            }
          },
        },
      },
    };
  };
/* eslint-enable */

export default plugin;
