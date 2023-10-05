import { createPredicate } from '@swagger-api/apidom-core';

import SecurityRequirementElement from './elements/SecurityRequirement';
import ScopesElement from './elements/ScopesElement';

export const isScopesElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof ScopesElement ||
      (hasBasicElementProps(element) &&
        isElementType('scopes', element) &&
        primitiveEq('object', element));
  },
);

export const isSecurityRequirementElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof SecurityRequirementElement ||
      (hasBasicElementProps(element) &&
        isElementType('securityRequirement', element) &&
        primitiveEq('object', element));
  },
);
