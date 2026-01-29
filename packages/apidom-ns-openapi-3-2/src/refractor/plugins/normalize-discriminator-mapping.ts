import {
  ArrayElement,
  cloneShallow,
  Element,
  isArrayElement,
  ObjectElement,
  StringElement,
  MemberElement,
  toValue,
  visit,
  isMemberElement,
  isStringElement,
} from '@swagger-api/apidom-core';
import { isReferenceLikeElement, isDiscriminatorElement } from '@swagger-api/apidom-ns-openapi-3-0';

import type { Toolbox } from '../toolbox.ts';
import OpenApi3_2Element from '../../elements/OpenApi3-2.ts';
import NormalizeStorage from './normalize-header-examples/NormalizeStorage.ts';
import { SchemaElement } from '../registration.ts';
import { isSchemaElement } from '../../predicates.ts';
import DiscriminatorElement from '../../elements/Discriminator.ts';

/**
 * Normalization of Discriminator.mapping field.
 *
 * Discriminator.mapping fields are normalized by adding missing mappings from oneOf/anyOf items
 * of the parent Schema Object and transforming existing mappings to Schema Objects.
 *
 * In case of allOf discriminator, the plugin will add missing mappings based on
 * allOf items of other Schema Objects.
 *
 * The normalized mapping is stored in the Schema.discriminator field as `x-normalized-mapping`.
 *
 * This plugin is designed to be used on dereferenced OpenAPI 3.1 documents.
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
    let allOfDiscriminatorMapping: ObjectElement;

    return {
      visitor: {
        OpenApi3_2Element: {
          enter(element: OpenApi3_2Element) {
            storage = new NormalizeStorage(element, storageField, 'discriminator-mapping');
            allOfDiscriminatorMapping =
              element.getMetaProperty('allOfDiscriminatorMapping') ?? new ObjectElement();
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

            const parentElement = ancestors[ancestors.length - 1];
            const schemaName = schemaElement.getMetaProperty('schemaName');
            const allOfMapping = allOfDiscriminatorMapping.getMember(toValue(schemaName));
            const hasAllOfMapping =
              // @ts-ignore
              allOfMapping && !parentElement?.classes?.contains('json-schema-allOf');

            // skip if neither oneOf, anyOf nor allOf is present
            if (
              !isArrayElement(schemaElement.oneOf) &&
              !isArrayElement(schemaElement.anyOf) &&
              !hasAllOfMapping
            ) {
              return;
            }

            const mapping = schemaElement.discriminator.get('mapping') ?? new ObjectElement();
            const normalizedMapping = new ObjectElement();
            let isNormalized = true;

            const items = isArrayElement(schemaElement.oneOf)
              ? schemaElement.oneOf
              : isArrayElement(schemaElement.anyOf)
                ? schemaElement.anyOf
                : (allOfMapping.value as ArrayElement);

            items.forEach((item) => {
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
              if (
                !hasAllOfMapping &&
                (metaRefOrigin !== baseURI || (!metaSchemaName && metaRefFields))
              ) {
                let hasMatchingMapping = false;

                mapping.forEach((mappingValue: StringElement, mappingKey: StringElement) => {
                  const mappingValueSchema = mappingValue.getMetaProperty('ref-schema');
                  const mappingValueSchemaRefBaseURI = mappingValueSchema
                    ?.getMetaProperty('ref-fields')
                    ?.get('$refBaseURI');

                  if (mappingValueSchemaRefBaseURI?.equals(metaRefFields?.$refBaseURI)) {
                    normalizedMapping.set(toValue(mappingKey), cloneShallow(item));
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
                    (!hasAllOfMapping ||
                      mappingValueSchemaRefBaseURI?.equals(metaRefFields?.$refBaseURI))
                  ) {
                    normalizedMapping.set(toValue(mappingKey), cloneShallow(item));
                    hasMatchingMapping = true;
                  }
                });

                // add a new mapping if no matching mapping was found
                if (!hasMatchingMapping) {
                  normalizedMapping.set(metaSchemaName, cloneShallow(item));
                }
              }
            });

            // check if any mapping is not a Schema Object or if any mapping was not normalized
            const mappingKeys = mapping.keys();
            const normalizedMappingKeys = normalizedMapping.keys();
            isNormalized =
              isNormalized &&
              normalizedMapping.filter((mappingValue: Element) => !isSchemaElement(mappingValue))
                .length === 0 &&
              mappingKeys.every((mappingKey: string) => normalizedMappingKeys.includes(mappingKey));

            if (isNormalized) {
              schemaElement.discriminator.set('x-normalized-mapping', normalizedMapping);

              // dive in and eliminate cycles that might be created by normalization
              visit(
                schemaElement,
                {},
                {
                  // @ts-ignore
                  detectCyclesCallback: <T extends Element>(
                    node: T,
                    nodeKey: string | number,
                    nodeParent: Element | undefined,
                  ) => {
                    if (
                      !nodeParent ||
                      !isMemberElement(node) ||
                      !isStringElement(node.key) ||
                      !node.key.equals('discriminator') ||
                      !isDiscriminatorElement(node.value)
                    ) {
                      return;
                    }

                    const discriminator = cloneShallow(node.value);
                    const discriminatorCopy = new DiscriminatorElement();

                    if (discriminator.get('mapping')) {
                      discriminatorCopy.mapping = discriminator.get('mapping');
                    }

                    if (discriminator.get('propertyName')) {
                      discriminatorCopy.propertyName = discriminator.get('propertyName');
                    }

                    // eslint-disable-next-line no-param-reassign
                    nodeParent[nodeKey] = new MemberElement(
                      new StringElement('discriminator'),
                      discriminatorCopy,
                    );
                  },
                },
              );

              storage!.append(schemaJSONPointer);
            }
          },
        },
      },
    };
  };

export default plugin;
