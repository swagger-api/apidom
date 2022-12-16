import { ArrayElement } from '@swagger-api/apidom-core';
import { OperationSecurityElement } from '@swagger-api/apidom-ns-openapi-3-0';

import OpenApi3_1Element from '../../elements/OpenApi3-1';
import OperationElement from '../../elements/Operation';
import { Predicates } from '../toolbox';
/**
 * Override of Security Requirement Objects.
 *
 * OpenAPI 3.1 specification excerpt that defines the override behavior:
 *
 * Operation.security definition overrides any declared top-level security.
 * To remove a top-level security declaration, an empty array can be used.
 * When a list of Security Requirement Objects is defined on the OpenAPI Object or Operation Object,
 * only one of the Security Requirement Objects in the list needs to be satisfied to authorize the request.
 */

/* eslint-disable no-param-reassign */
const plugin =
  () =>
  ({ predicates }: { predicates: Predicates }) => {
    let topLevelSecurity: ArrayElement | undefined;

    return {
      visitor: {
        OpenApi3_1Element: {
          enter(openapiElement: OpenApi3_1Element) {
            if (predicates.isArrayElement(openapiElement.security)) {
              topLevelSecurity = openapiElement.security;
              return undefined;
            }
            return false;
          },
          leave() {
            topLevelSecurity = undefined;
          },
        },
        OperationElement: {
          leave(
            operationElement: OperationElement,
            key: any,
            parent: any,
            path: any,
            ancestors: any[],
          ) {
            // skip visiting this Operation
            if (ancestors.some(predicates.isComponentsElement)) {
              return false;
            }

            const missingOperationLevelSecurity = typeof operationElement.security === 'undefined';
            const hasTopLevelSecurity = typeof topLevelSecurity !== 'undefined';

            if (missingOperationLevelSecurity && hasTopLevelSecurity) {
              operationElement.security = new OperationSecurityElement(topLevelSecurity?.content);
            }

            return undefined;
          },
        },
      },
    };
  };
/* eslint-enable */

export default plugin;
