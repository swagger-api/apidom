import { cloneDeep, Element, isArrayElement, toValue } from '@swagger-api/apidom-core';
import {
  DiscriminatorMappingElement,
  isReferenceLikeElement,
} from '@swagger-api/apidom-ns-openapi-3-0';

import type { Toolbox } from '../toolbox.ts';
import OpenApi3_1Element from '../../elements/OpenApi3-1.ts';
import NormalizeStorage from './normalize-header-examples/NormalizeStorage.ts';
import { SchemaElement } from '../registration.ts';
import { isSchemaElement } from '../../predicates.ts';

/**
 * Normalization of Discriminator.mapping field.
 *
 * Discriminator.mapping fields are normalized by adding missing mappings from oneOf/anyOf items
 * of the parent Schema Object.
 *
 * This plugin also marks the Schema.discriminator field with `x-swagger-ui-normalized` property,
 * depending on whether the Discriminator.mapping is valid according to the OpenAPI 3.1 specification.
 *
 * NOTE: this plugin is idempotent
 * @public
 */

export interface PluginOptions {
  storageField?: string;
  baseURI?: string;
}

const handleItem = (
  schemaElement: SchemaElement,
  item: Element,
  normalizedMapping: DiscriminatorMappingElement,
  baseURI: string,
) => {
  if (!isSchemaElement(item)) {
    return;
  }

  if (isReferenceLikeElement(item)) {
    schemaElement.discriminator!.set('x-swagger-ui-normalized', false);
    return;
  }

  const metaRefFields = toValue(item.getMetaProperty('ref-fields'));
  const metaRefOrigin = toValue(item.getMetaProperty('ref-origin'));
  const metaSchemaName = toValue(item.getMetaProperty('name'));

  // handle external references
  if (metaRefOrigin !== baseURI) {
    const hasMatchingMapping =
      normalizedMapping.find((element: Element) =>
        element.getMetaProperty('ref-fields')?.get('$ref')?.equals(metaRefFields?.$ref),
      ).length > 0;

    if (!hasMatchingMapping) {
      schemaElement.discriminator!.set('x-swagger-ui-normalized', false);
    }
    return;
  }

  // handle internal references that don't point to components/schemas/<SchemaName>
  if (!metaSchemaName && metaRefFields) {
    schemaElement.discriminator!.set('x-swagger-ui-normalized', false);
    return;
  }

  const hasMatchingMapping =
    normalizedMapping.find((element: Element) =>
      element.getMetaProperty('name')?.equals(metaSchemaName),
    ).length > 0;

  // handle internal references that point to components/schemas/<SchemaName> and have no mapping
  if (metaSchemaName && !hasMatchingMapping) {
    normalizedMapping.set(metaSchemaName, cloneDeep(item));
  }
};

/**
 * @public
 */
const plugin =
  ({ storageField = 'x-normalized', baseURI = '' }: PluginOptions = {}) =>
  (toolbox: Toolbox) => {
    const { ancestorLineageToJSONPointer } = toolbox;
    let storage: NormalizeStorage | undefined;

    return {
      visitor: {
        OpenApi3_1Element: {
          enter(element: OpenApi3_1Element) {
            storage = new NormalizeStorage(element, storageField, 'discriminator-mapping');
          },
          leave() {
            storage = undefined;
          },
        },

        SchemaElement: {
          leave(
            schemaElement: SchemaElement,
            key: string | number,
            parent: Element | undefined,
            path: (string | number)[],
            ancestors: [Element | Element[]],
          ) {
            // no Schema.discriminator field present
            if (typeof schemaElement.discriminator === 'undefined') {
              return;
            }

            const schemaJSONPointer = ancestorLineageToJSONPointer([
              ...ancestors,
              parent!,
              schemaElement,
            ]);

            // skip visiting this Schema Object if it's already normalized
            if (storage!.includes(schemaJSONPointer)) {
              return;
            }

            schemaElement.discriminator.set('x-swagger-ui-normalized', true);

            const mapping =
              schemaElement.discriminator.get('mapping') ?? new DiscriminatorMappingElement();
            const normalizedMapping: DiscriminatorMappingElement = cloneDeep(mapping);

            if (isArrayElement(schemaElement.oneOf)) {
              schemaElement.oneOf.forEach((item) => {
                handleItem(schemaElement, item, normalizedMapping, baseURI);
              });
            }

            if (isArrayElement(schemaElement.anyOf)) {
              schemaElement.anyOf.forEach((item) => {
                handleItem(schemaElement, item, normalizedMapping, baseURI);
              });
            }

            // check if any mapping is not a Schema Object or if it was not dereferenced
            normalizedMapping.forEach((mappingValue: Element) => {
              if (!isSchemaElement(mappingValue) || isReferenceLikeElement(mappingValue)) {
                schemaElement.discriminator!.set('x-swagger-ui-normalized', false);
              }
            });

            if (schemaElement.discriminator.get('x-swagger-ui-normalized').equals(true)) {
              schemaElement.discriminator.set('mapping', normalizedMapping);
            }

            storage!.append(schemaJSONPointer);
          },
        },
      },
    };
  };

export default plugin;
