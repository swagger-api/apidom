import { uniqWith, pathOr, last } from 'ramda';
import { isArrayElement, isStringElement, StringElement, toValue } from '@swagger-api/apidom-core';
import { OperationParametersElement } from '@swagger-api/apidom-ns-openapi-3-0';

import { isParameterElement, isComponentsElement } from '../../predicates';
import ParameterElement from '../../elements/Parameter';
import PathItemElement from '../../elements/PathItem';
import OperationElement from '../../elements/Operation';

/**
 * Establishes identity between two Parameter Objects.
 *
 * {@link https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#user-content-operationparameters}
 */
const parameterEquals = (parameter1: ParameterElement, parameter2: ParameterElement) => {
  if (!isParameterElement(parameter1)) return false;
  if (!isParameterElement(parameter2)) return false;
  if (!isStringElement(parameter1.name)) return false;
  if (!isStringElement(parameter1.in)) return false;
  if (!isStringElement(parameter2.name)) return false;
  if (!isStringElement(parameter2.in)) return false;

  return (
    toValue(parameter1.name as StringElement) === toValue(parameter2.name as StringElement) &&
    toValue(parameter1.in as StringElement) === toValue(parameter2.in as StringElement)
  );
};

/**
 * Inheritance of Parameter Objects.
 *
 * OpenAPI 3.1 specification excerpt that defines the inheritance behavior:
 *
 * A list of parameters that are applicable for this operation. If a parameter is already defined at the Path Item,
 * the new definition will override it but can never remove it. The list MUST NOT include duplicated parameters.
 * A unique parameter is defined by a combination of a name and location.
 */
/* eslint-disable no-param-reassign */
const plugin = () => () => {
  const pathItemParameters: ParameterElement[][] = [];

  return {
    visitor: {
      PathItemElement: {
        enter(
          pathItemElement: PathItemElement,
          key: any,
          parent: any,
          path: any,
          ancestors: any[],
        ) {
          // skip visiting this Path Item
          if (ancestors.some(isComponentsElement)) {
            return false;
          }

          const { parameters } = pathItemElement;

          if (isArrayElement(parameters)) {
            pathItemParameters.push([...parameters.content] as ParameterElement[]);
          } else {
            pathItemParameters.push([]);
          }

          return undefined;
        },
        leave() {
          pathItemParameters.pop();
        },
      },
      OperationElement: {
        leave(operationElement: OperationElement) {
          const parentPathItemParameters = last(pathItemParameters);

          // no Path Item Object parameters to inherit from
          if (!Array.isArray(parentPathItemParameters) || parentPathItemParameters.length === 0) {
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
        },
      },
    },
  };
};
/* eslint-enable */

export default plugin;
