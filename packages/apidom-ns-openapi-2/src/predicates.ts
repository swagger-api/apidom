import { createPredicate } from '@swagger-api/apidom-core';

import SecurityRequirementElement from './elements/SecurityRequirement';

// eslint-disable-next-line import/prefer-default-export
export const isSecurityRequirementElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof SecurityRequirementElement ||
      (hasBasicElementProps(element) &&
        isElementType('securityRequirement', element) &&
        primitiveEq('object', element));
  },
);
