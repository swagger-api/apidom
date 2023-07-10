import { last, defaultTo, groupBy } from 'ramda';
import { toValue, StringElement, Namespace } from '@swagger-api/apidom-core';

import LinkElement from '../../elements/Link';
import PathItemElement from '../../elements/PathItem';
import OperationElement from '../../elements/Operation';
import { Predicates } from '../toolbox';

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
 */
/* eslint-disable no-param-reassign */

const plugin =
  ({ operationIdNormalizer = normalizeOperationId } = {}) =>
  ({ predicates, namespace }: { predicates: Predicates; namespace: Namespace }) => {
    const paths: string[] = [];
    const normalizedOperations: OperationElement[] = [];
    const links: LinkElement[] = [];

    return {
      visitor: {
        OpenApi3_1Element: {
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

              linkElement.operationId = operationElement.operationId?.clone();
              linkElement.meta.set('originalOperationId', linkOperationId);
              linkElement.set('__originalOperationId', linkOperationId);
            });

            // cleanup the references
            normalizedOperations.length = 0;
            links.length = 0;
          },
        },
        PathItemElement: {
          enter(pathItemElement: PathItemElement) {
            // `path` meta may not be always available, e.g. in Callback Object or Components Object
            const path = defaultTo('path', toValue(pathItemElement.meta.get('path')));
            paths.push(path);
          },
          leave() {
            paths.pop();
          },
        },
        OperationElement: {
          enter(operationElement: OperationElement) {
            // operationId field is undefined, needs no normalization
            if (typeof operationElement.operationId === 'undefined') return;

            // cast operationId to string type
            const originalOperationId = String(toValue(operationElement.operationId));
            // perform operationId normalization
            const path = last(paths) as string;
            // `http-method` meta may not be always available, e.g. in Callback Object or Components Object
            const method = defaultTo(
              'method',
              toValue(operationElement.meta.get('http-method')),
            ) as string;
            const normalizedOperationId = operationIdNormalizer(originalOperationId, path, method);

            // normalization is not necessary
            if (originalOperationId === normalizedOperationId) return;

            // @ts-ignore
            operationElement.operationId = new namespace.elements.String(normalizedOperationId);
            operationElement.set('__originalOperationId', originalOperationId);
            operationElement.meta.set('originalOperationId', originalOperationId);

            normalizedOperations.push(operationElement);
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
