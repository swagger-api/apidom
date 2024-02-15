import {
  OpenApi3_1Element,
  SecurityRequirementElement,
  SecuritySchemeElement,
  isSecuritySchemeElement,
  isComponentsElement,
} from '@swagger-api/apidom-ns-openapi-3-1';
import { AnnotationElement, toValue, isObjectElement, Element } from '@swagger-api/apidom-core';

import type { Toolbox } from '../toolbox';

type SecurityRequirementsArrayPluginOptions = {
  annotations: AnnotationElement[];
};

/*
 * OpenAPI 3.0.3
 * If the security scheme is of type "oauth2" or "openIdConnect", then the value is a list of scope names required for the execution, and the list MAY be empty if authorization does not require a specified scope. For other security scheme types, the array MUST be empty.
 *
 * OpenAPI 3.1.0
 * If the security scheme is of type "oauth2" or "openIdConnect", then the value is a list of scope names required for the execution, and the list MAY be empty if authorization does not require a specified scope. For other security scheme types, the array MAY contain a list of role names which are required for the execution, but are not otherwise defined or exchanged in-band.
 * This issue is conveying the fact that all other types than oauth2 or openIdConnect must have empty array [] as a value. In OpenAPI 3.1.0 the value MAY contain roles for other types.
 */
const securityRequirementsEmptyRolesRefractorPlugin =
  ({ annotations }: SecurityRequirementsArrayPluginOptions) =>
  (toolbox: Toolbox) => {
    const relevantSecuritySchemes: SecuritySchemeElement[] = [];

    const createAnnotation = <T extends Element>(element: T) =>
      toolbox.createAnnotation.fromElement(
        element,
        'List of roles for Security Requirement Object  is not supported in OpenAPI 3.0.3 for Security Scheme Object types other than "oauth2" and "openIdConnect". As a result, all Security Requirement Objects with Security Scheme Object type other than "oauth2" and "openIdConnect" have been set to an empty array.',
        { classes: ['warning'] },
        { code: 'security-requirements-empty-roles' },
      );

    return {
      visitor: {
        OpenApi3_1Element(element: OpenApi3_1Element) {
          if (!isComponentsElement(element.components)) return undefined;
          if (!isObjectElement(element.components.securitySchemes)) return undefined;

          const nonEmptyRolesTypes = ['oauth2', 'openIdConnect'];

          element.components.securitySchemes.forEach((value) => {
            if (
              isSecuritySchemeElement(value) &&
              !nonEmptyRolesTypes.includes(toValue(value.type))
            ) {
              relevantSecuritySchemes.push(value);
            }
          });

          return undefined;
        },
        SecurityRequirementElement(element: SecurityRequirementElement) {
          if (!relevantSecuritySchemes.length) return undefined;

          const keysToEmpty: string[] = [];

          element.forEach((value, key) => {
            const relevantSecurityScheme = relevantSecuritySchemes.find(
              (securityScheme) => toValue(securityScheme.name) === toValue(key),
            );

            if (isSecuritySchemeElement(relevantSecurityScheme)) {
              keysToEmpty.push(toValue(key));
              annotations.push(createAnnotation(value));
            }
          });

          if (!keysToEmpty.length) return undefined;

          keysToEmpty.forEach((key) => {
            element.set(key, []);
          });

          return undefined;
        },
      },
      post() {
        relevantSecuritySchemes.length = 0;
      },
    };
  };

export default securityRequirementsEmptyRolesRefractorPlugin;
