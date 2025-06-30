import {
  cloneDeep,
  Element,
  isArrayElement,
  ObjectElement,
  StringElement,
  toValue,
} from '@swagger-api/apidom-core';
import { isReferenceLikeElement, isDiscriminatorElement } from '@swagger-api/apidom-ns-openapi-3-0';

import type { Toolbox } from '../toolbox.ts';
import OpenApi3_1Element from '../../elements/OpenApi3-1.ts';
import NormalizeStorage from './normalize-header-examples/NormalizeStorage.ts';
import { SchemaElement } from '../registration.ts';
import { isSchemaElement } from '../../predicates.ts';

/**
 * Normalization of Discriminator.mapping field.
 *
 * Discriminator.mapping fields are normalized by adding missing mappings from oneOf/anyOf items
 * of the parent Schema Object and transforming existing mappings to Schema Objects.
 *
 * The normalized mapping is stored in the Schema.discriminator field as `x-normalized-mapping`.
 *
 * NOTE: this plugin is idempotent
 * @public
 */

export interface PluginOptions {
  storageField?: string;
  baseURI?: string;
}

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
            if (!isDiscriminatorElement(schemaElement.discriminator)) {
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

            // skip if both oneOf and anyOf are present
            if (isArrayElement(schemaElement.oneOf) && isArrayElement(schemaElement.anyOf)) {
              return;
            }

            // skip if neither oneOf nor anyOf is present
            if (!isArrayElement(schemaElement.oneOf) && !isArrayElement(schemaElement.anyOf)) {
              return;
            }

            const mapping = schemaElement.discriminator.get('mapping') ?? new ObjectElement();
            const normalizedMapping: ObjectElement = cloneDeep(mapping);
            let isNormalized = true;

            const items = isArrayElement(schemaElement.oneOf)
              ? schemaElement.oneOf
              : schemaElement.anyOf;

            items!.forEach((item) => {
              if (!isSchemaElement(item)) {
                return;
              }

              if (isReferenceLikeElement(item)) {
                isNormalized = false;
                return;
              }

              const metaRefFields = toValue(item.getMetaProperty('ref-fields'));
              const metaRefOrigin = toValue(item.getMetaProperty('ref-origin'));
              const metaSchemaName = toValue(item.getMetaProperty('schemaName'));

              /**
               * handle external references and internal references
               * that don't point to components/schemas/<SchemaName>
               */
              if (metaRefOrigin !== baseURI || (!metaSchemaName && metaRefFields)) {
                let hasMatchingMapping = false;

                mapping.forEach((mappingValue: StringElement, mappingKey: StringElement) => {
                  const mappingValueSchema = mappingValue.getMetaProperty('ref-schema');
                  const mappingValueSchemaRefBaseURI = mappingValueSchema
                    ?.getMetaProperty('ref-fields')
                    ?.get('$refBaseURI');

                  if (mappingValueSchemaRefBaseURI?.equals(metaRefFields?.$refBaseURI)) {
                    normalizedMapping.set(mappingKey, cloneDeep(item));
                    hasMatchingMapping = true;
                  }
                });

                if (!hasMatchingMapping) {
                  isNormalized = false;
                }
                return;
              }

              // handle internal references that point to components/schemas/<SchemaName>
              if (metaSchemaName) {
                let hasMatchingMapping = false;

                mapping.forEach((mappingValue: StringElement, mappingKey: StringElement) => {
                  const mappingValueSchema = mappingValue.getMetaProperty('ref-schema');
                  const mappingValueSchemaName = mappingValueSchema?.getMetaProperty('schemaName');
                  const mappingValueSchemaRefBaseURI = mappingValueSchema
                    ?.getMetaProperty('ref-fields')
                    ?.get('$refBaseURI');

                  if (
                    mappingValueSchemaName?.equals(metaSchemaName) &&
                    mappingValueSchemaRefBaseURI?.equals(metaRefFields?.$refBaseURI)
                  ) {
                    normalizedMapping.set(mappingKey, cloneDeep(item));
                    hasMatchingMapping = true;
                  }
                });

                // add a new mapping if no matching mapping was found
                if (!hasMatchingMapping) {
                  normalizedMapping.set(metaSchemaName, cloneDeep(item));
                }
              }
            });

            // check if any mapping is not a Schema Object
            isNormalized =
              isNormalized &&
              normalizedMapping.filter((mappingValue: Element) => !isSchemaElement(mappingValue))
                .length === 0;

            if (isNormalized) {
              schemaElement.discriminator.set('x-normalized-mapping', normalizedMapping);
              storage!.append(schemaJSONPointer);
            }
          },
        },
      },
    };
  };

export default plugin;
