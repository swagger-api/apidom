import { uniqWith, pathOr, last } from 'ramda';
import { Element, StringElement, toValue } from '@swagger-api/apidom-core';
import { OperationParametersElement } from '@swagger-api/apidom-ns-openapi-3-0';

import ParameterElement from '../../elements/Parameter.ts';
import PathItemElement from '../../elements/PathItem.ts';
import OperationElement from '../../elements/Operation.ts';
import type { Toolbox } from '../toolbox.ts';
import OpenApi3_1Element from '../../elements/OpenApi3-1.ts';
import NormalizeStorage from './normalize-header-examples/NormalizeStorage.ts';

/**
 * Inheritance of Parameter Objects.
 *
 * OpenAPI 3.1 specification excerpt that defines the inheritance behavior:
 *
 * A list of parameters that are applicable for this operation. If a parameter is already defined at the Path Item,
 * the new definition will override it but can never remove it. The list MUST NOT include duplicated parameters.
 * A unique parameter is defined by a combination of a name and location.
 *
 * NOTE: this plugin is idempotent
 */

interface PluginOptions {
  storageField?: string;
}

/* eslint-disable no-param-reassign */
const plugin =
  ({ storageField = 'x-normalized' }: PluginOptions = {}) =>
  (toolbox: Toolbox) => {
    const { predicates, ancestorLineageToJSONPointer } = toolbox;
    /**
     * Establishes identity between two Parameter Objects.
     *
     * {@link https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#user-content-operationparameters}
     */
    const parameterEquals = (parameter1: ParameterElement, parameter2: ParameterElement) => {
      if (!predicates.isParameterElement(parameter1)) return false;
      if (!predicates.isParameterElement(parameter2)) return false;
      if (!predicates.isStringElement(parameter1.name)) return false;
      if (!predicates.isStringElement(parameter1.in)) return false;
      if (!predicates.isStringElement(parameter2.name)) return false;
      if (!predicates.isStringElement(parameter2.in)) return false;

      return (
        toValue(parameter1.name as StringElement) === toValue(parameter2.name as StringElement) &&
        toValue(parameter1.in as StringElement) === toValue(parameter2.in as StringElement)
      );
    };

    const pathItemParameters: ParameterElement[][] = [];
    let storage: NormalizeStorage | undefined;

    return {
      visitor: {
        OpenApi3_1Element: {
          enter(element: OpenApi3_1Element) {
            storage = new NormalizeStorage(element, storageField, 'parameters');
          },
          leave() {
            storage = undefined;
          },
        },
        PathItemElement: {
          enter(
            pathItemElement: PathItemElement,
            key: string | number,
            parent: Element | undefined,
            path: (string | number)[],
            ancestors: [Element | Element[]],
          ) {
            // skip visiting this Path Item
            if (ancestors.some(predicates.isComponentsElement)) {
              return;
            }

            const { parameters } = pathItemElement;

            if (predicates.isArrayElement(parameters)) {
              pathItemParameters.push([...parameters.content] as ParameterElement[]);
            } else {
              pathItemParameters.push([]);
            }
          },
          leave() {
            pathItemParameters.pop();
          },
        },
        OperationElement: {
          leave(
            operationElement: OperationElement,
            key: string | number,
            parent: Element | undefined,
            path: (string | number)[],
            ancestors: [Element | Element[]],
          ) {
            const parentPathItemParameters = last(pathItemParameters);

            // no Path Item Object parameters to inherit from
            if (!Array.isArray(parentPathItemParameters) || parentPathItemParameters.length === 0) {
              return;
            }

            const operationJSONPointer = ancestorLineageToJSONPointer([
              ...ancestors,
              parent!,
              operationElement,
            ]);

            // skip visiting this Operation Object if it's already normalized
            if (storage!.includes(operationJSONPointer)) {
              return;
            }

            const operationParameters = pathOr(
              [],
              ['parameters', 'content'],
              operationElement,
            ) as ParameterElement[];

            // prefers the first item if two items compare equal based on the predicate
            const mergedParameters = uniqWith(parameterEquals, [
              ...operationParameters,
              ...parentPathItemParameters,
            ]);

            operationElement.parameters = new OperationParametersElement(mergedParameters);
            storage!.append(operationJSONPointer);
          },
        },
      },
    };
  };
/* eslint-enable */

export default plugin;
