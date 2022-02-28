import { createPredicate } from '@swagger-api/apidom-core';

import MainElement from './elements/Main';
import InfoElement from './elements/Info';
import PrincipleElement from './elements/Principle';
import RequirementElement from './elements/Requirement';
import RequirementLevelElement from './elements/RequirementLevel';
import ScenarioElement from './elements/Scenario';
import StandardElement from './elements/Standard';
import StandardIdentifierElement from './elements/StandardIdentifier';

export const isMainElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof MainElement ||
      (hasBasicElementProps(element) &&
        isElementType('main', element) &&
        primitiveEq('object', element));
  },
);

export const isInfoElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof InfoElement ||
      (hasBasicElementProps(element) &&
        isElementType('info', element) &&
        primitiveEq('object', element));
  },
);

export const isPrincipleElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof PrincipleElement ||
      (hasBasicElementProps(element) &&
        isElementType('principle', element) &&
        primitiveEq('object', element));
  },
);

export const isRequirementElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof RequirementElement ||
      (hasBasicElementProps(element) &&
        isElementType('requirement', element) &&
        primitiveEq('object', element));
  },
);

export const isRequirementLevelElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof RequirementLevelElement ||
      (hasBasicElementProps(element) &&
        isElementType('requirementLevel', element) &&
        primitiveEq('string', element));
  },
);

export const isScenarioElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof ScenarioElement ||
      (hasBasicElementProps(element) &&
        isElementType('scenario', element) &&
        primitiveEq('object', element));
  },
);

export const isStandardElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof StandardElement ||
      (hasBasicElementProps(element) &&
        isElementType('standard', element) &&
        primitiveEq('object', element));
  },
);

export const isStandardIdentifierElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof StandardIdentifierElement ||
      (hasBasicElementProps(element) &&
        isElementType('standardIdentifier', element) &&
        primitiveEq('array', element));
  },
);
