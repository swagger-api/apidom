import { last, defaultTo, groupBy } from 'ramda';
import { toValue, Element, StringElement, cloneDeep } from '@swagger-api/apidom-core';

import LinkElement from '../../elements/Link.ts';
import PathItemElement from '../../elements/PathItem.ts';
import OperationElement from '../../elements/Operation.ts';
import type { Toolbox } from '../toolbox.ts';
import OpenApi3_1Element from '../../elements/OpenApi3-1.ts';
import NormalizeStorage from './normalize-header-examples/NormalizeStorage.ts';

const removeSpaces = (operationId: string) => {
  return operationId.replace(/\s/g, '');
};

const replaceSpecialCharsWithUnderscore = (operationId: string) => {
  return operationId.replace(/\W/gi, '_');
};

const createNormalizedOperationId = (path: string, method: string) => {
  const normalizedMethod = replaceSpecialCharsWithUnderscore(removeSpaces(method.toLowerCase()));
  const normalizedPath = replaceSpecialCharsWithUnderscore(removeSpaces(path));

  return `${normalizedMethod}${normalizedPath}`;
};

const normalizeOperationId = (operationId: string, path: string, method: string) => {
  const withoutSpaces = removeSpaces(operationId);

  if (withoutSpaces.length > 0) {
    return replaceSpecialCharsWithUnderscore(withoutSpaces);
  }

  return createNormalizedOperationId(path, method);
};

/**
 * Normalization of Operation.operationId field.
 *
 * This normalization is not guided by OpenAPI 3.1 specification.
 *
 * Existing Operation.operationId fields are normalized into snake case form.
 *
 * Operation Objects, that do not define operationId field, are left untouched.
 *
 * Original operationId is stored in meta and as new `__originalOperationId` field.
 *
 * This plugin also guarantees the uniqueness of all defined Operation.operationId fields,
 * and make sure Link.operationId fields are pointing to correct and normalized Operation.operationId fields.
 *
 * NOTE: this plugin is idempotent
 */

interface PluginOptions {
  storageField?: string;
  operationIdNormalizer?: (operationId: string, path: string, method: string) => string;
}

/* eslint-disable no-param-reassign */
const plugin =
  ({
    storageField = 'x-normalized',
    operationIdNormalizer = normalizeOperationId,
  }: PluginOptions = {}) =>
  (toolbox: Toolbox) => {
    const { predicates, ancestorLineageToJSONPointer, namespace } = toolbox;
    const pathTemplates: string[] = [];
    const normalizedOperations: OperationElement[] = [];
    const links: LinkElement[] = [];
    let storage: NormalizeStorage | undefined;

    return {
      visitor: {
        OpenApi3_1Element: {
          enter(element: OpenApi3_1Element) {
            storage = new NormalizeStorage(element, storageField, 'operation-ids');
          },
          leave() {
            // group normalized operations by normalized operationId
            const normalizedOperationGroups = groupBy((operationElement: OperationElement) => {
              return toValue(operationElement.operationId as StringElement);
            }, normalizedOperations);

            // append incremental numerical suffixes to identical operationIds
            Object.entries(normalizedOperationGroups).forEach(
              ([normalizedOperationId, operationElements]) => {
                if (!Array.isArray(operationElements)) return;
                if (operationElements.length <= 1) return;

                operationElements.forEach((operationElement, index) => {
                  const indexedNormalizedOperationId = `${normalizedOperationId}${index + 1}`;
                  // @ts-ignore
                  operationElement.operationId = new namespace.elements.String(
                    indexedNormalizedOperationId,
                  );
                });
              },
            );

            // rectify possibly broken Link.operationId fields
            links.forEach((linkElement) => {
              if (typeof linkElement.operationId === 'undefined') return;

              const linkOperationId = String(toValue(linkElement.operationId));
              const operationElement = normalizedOperations.find((normalizedOperationElement) => {
                const originalOperationId = toValue(
                  normalizedOperationElement.meta.get('originalOperationId'),
                );
                return originalOperationId === linkOperationId;
              });

              // Link Object doesn't need to be rectified
              if (typeof operationElement === 'undefined') return;

              linkElement.operationId = cloneDeep.safe(operationElement.operationId);
              linkElement.meta.set('originalOperationId', linkOperationId);
              linkElement.set('__originalOperationId', linkOperationId);
            });

            // cleanup the references
            normalizedOperations.length = 0;
            links.length = 0;
            storage = undefined;
          },
        },
        PathItemElement: {
          enter(pathItemElement: PathItemElement) {
            // `path` meta may not be always available, e.g. in Callback Object or Components Object
            const pathTemplate = defaultTo('path', toValue(pathItemElement.meta.get('path')));
            pathTemplates.push(pathTemplate);
          },
          leave() {
            pathTemplates.pop();
          },
        },
        OperationElement: {
          enter(
            operationElement: OperationElement,
            key: string | number,
            parent: Element | undefined,
            path: (string | number)[],
            ancestors: [Element | Element[]],
          ) {
            // operationId field is undefined, needs no normalization
            if (typeof operationElement.operationId === 'undefined') return;

            const operationJSONPointer = ancestorLineageToJSONPointer([
              ...ancestors,
              parent!,
              operationElement,
            ]);

            // skip visiting this Operation Object if it's already normalized
            if (storage!.includes(operationJSONPointer)) {
              return;
            }

            // cast operationId to string type
            const originalOperationId = String(toValue(operationElement.operationId));
            // perform operationId normalization
            const pathTemplate = last(pathTemplates) as string;
            // `http-method` meta may not be always available, e.g. in Callback Object or Components Object
            const method = defaultTo(
              'method',
              toValue(operationElement.meta.get('http-method')),
            ) as string;
            const normalizedOperationId = operationIdNormalizer(
              originalOperationId,
              pathTemplate,
              method,
            );

            // normalization is not necessary
            if (originalOperationId === normalizedOperationId) return;

            // @ts-ignore
            operationElement.operationId = new namespace.elements.String(normalizedOperationId);
            operationElement.set('__originalOperationId', originalOperationId);
            operationElement.meta.set('originalOperationId', originalOperationId);

            normalizedOperations.push(operationElement);
            storage!.append(operationJSONPointer);
          },
        },
        LinkElement: {
          leave(linkElement: LinkElement) {
            // make sure this Link elements doesn't come from base namespace
            if (!predicates.isLinkElement(linkElement)) return;
            // ignore Link Objects with undefined operationId
            if (typeof linkElement.operationId === 'undefined') return;

            links.push(linkElement);
          },
        },
      },
    };
  };
/* eslint-enable */

export default plugin;
