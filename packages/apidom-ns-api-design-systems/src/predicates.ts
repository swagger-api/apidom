import { createPredicate } from '@swagger-api/apidom-core';

import MainElement from './elements/Main.ts';
import InfoElement from './elements/Info.ts';
import PrincipleElement from './elements/Principle.ts';
import RequirementElement from './elements/Requirement.ts';
import RequirementLevelElement from './elements/RequirementLevel.ts';
import ScenarioElement from './elements/Scenario.ts';
import StandardElement from './elements/Standard.ts';
import StandardIdentifierElement from './elements/StandardIdentifier.ts';

/**
 * @public
 */
export const isMainElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is MainElement =>
      element instanceof MainElement ||
      (hasBasicElementProps(element) &&
        isElementType('main', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isInfoElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is InfoElement =>
      element instanceof InfoElement ||
      (hasBasicElementProps(element) &&
        isElementType('info', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isPrincipleElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is PrincipleElement =>
      element instanceof PrincipleElement ||
      (hasBasicElementProps(element) &&
        isElementType('principle', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isRequirementElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is RequirementElement =>
      element instanceof RequirementElement ||
      (hasBasicElementProps(element) &&
        isElementType('requirement', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isRequirementLevelElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is RequirementLevelElement =>
      element instanceof RequirementLevelElement ||
      (hasBasicElementProps(element) &&
        isElementType('requirementLevel', element) &&
        primitiveEq('string', element));
  },
);

/**
 * @public
 */
export const isScenarioElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ScenarioElement =>
      element instanceof ScenarioElement ||
      (hasBasicElementProps(element) &&
        isElementType('scenario', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isStandardElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is StandardElement =>
      element instanceof StandardElement ||
      (hasBasicElementProps(element) &&
        isElementType('standard', element) &&
        primitiveEq('object', element));
  },
);

/**
 * @public
 */
export const isStandardIdentifierElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is StandardIdentifierElement =>
      element instanceof StandardIdentifierElement ||
      (hasBasicElementProps(element) &&
        isElementType('standardIdentifier', element) &&
        primitiveEq('array', element));
  },
);
