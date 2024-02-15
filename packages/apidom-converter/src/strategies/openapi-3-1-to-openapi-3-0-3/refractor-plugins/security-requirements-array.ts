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

const securityRequirementsArrayRefractorPlugin =
  ({ annotations }: SecurityRequirementsArrayPluginOptions) =>
  (toolbox: Toolbox) => {
    const relevantSecuritySchemes: SecuritySchemeElement[] = [];

    const createAnnotation = <T extends Element>(element: T) =>
      toolbox.createAnnotation.fromElement(
        element,
        'List of roles for Security Requirement Object  is not supported in OpenAPI 3.0.3 for Security Scheme Object types other than "oauth2" and "openIdConnect". As a result, all Security Requirement Objects with Security Scheme Object type other than "oauth2" and "openIdConnect" have been set to an empty array.',
        { classes: ['error'] },
        { code: 'security-requirements-array' },
      );

    return {
      visitor: {
        OpenApi3_1Element(element: OpenApi3_1Element) {
          if (!isComponentsElement(element.components)) return undefined;
          if (!isObjectElement(element.components.securitySchemes)) return undefined;

          element.components.securitySchemes.forEach((value) => {
            if (
              isSecuritySchemeElement(value) &&
              !(toValue(value.type) === 'oauth2' || toValue(value.type) === 'openIdConnect')
            ) {
              relevantSecuritySchemes.push(value);
            }
          });

          return undefined;
        },
        SecurityRequirementElement(element: SecurityRequirementElement) {
          if (!relevantSecuritySchemes.length) return undefined;

          const keysToAlternate: string[] = [];

          element.forEach((value, key) => {
            const relevantSecurityScheme = relevantSecuritySchemes.find(
              (securityScheme) => toValue(securityScheme.name) === toValue(key),
            );

            if (isSecuritySchemeElement(relevantSecurityScheme)) {
              keysToAlternate.push(toValue(key));
              annotations.push(createAnnotation(value));
            }
          });

          if (!keysToAlternate.length) return undefined;

          keysToAlternate.forEach((key) => {
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

export default securityRequirementsArrayRefractorPlugin;
