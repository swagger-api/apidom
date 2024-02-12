import {
  ComponentsElement,
  OpenApi3_1Element,
  SecurityRequirementElement,
  SecuritySchemeElement,
  isSecuritySchemeElement,
  isComponentsElement,
} from '@swagger-api/apidom-ns-openapi-3-1';
import { AnnotationElement, toValue, isObjectElement, Element } from '@swagger-api/apidom-core';

import type { Toolbox } from '../toolbox';

type SecuritySchemeTypePluginOptions = {
  annotations: AnnotationElement[];
};

const securitySchemeTypeRefractorPlugin =
  ({ annotations }: SecuritySchemeTypePluginOptions) =>
  (toolbox: Toolbox) => {
    const removedSecuritySchemes: SecuritySchemeElement[] = [];
    const createAnnotation = <T extends Element>(element: T) =>
      toolbox.createAnnotation.fromElement(
        element,
        'The "mutualTLS" type Security Scheme Object is not supported in OpenAPI 3.0.3. As a result, all Security Scheme Objects specified with the "mutualTLS" type have been removed.',
        { classes: ['error'] },
        { code: 'mutualTLS' },
      );

    return {
      visitor: {
        OpenApi3_1Element(element: OpenApi3_1Element) {
          if (!isComponentsElement(element.components)) return undefined;
          if (!isObjectElement(element.components.securitySchemes)) return undefined;

          element.components.securitySchemes.forEach((value) => {
            if (isSecuritySchemeElement(value) && toValue(value.type) === 'mutualTLS') {
              removedSecuritySchemes.push(value);
            }
          });

          return undefined;
        },
        ComponentsElement(element: ComponentsElement) {
          if (!isObjectElement(element.securitySchemes)) return undefined;

          element.securitySchemes.forEach((value, key) => {
            if (isSecuritySchemeElement(value) && toValue(value.type) === 'mutualTLS') {
              if (!removedSecuritySchemes.includes(value)) removedSecuritySchemes.push(value);
              (element.securitySchemes as SecuritySchemeElement).remove(toValue(key));
              annotations.push(createAnnotation(value));
            }
          });

          return undefined;
        },
        SecurityRequirementElement(element: SecurityRequirementElement) {
          if (!removedSecuritySchemes.length) return undefined;

          const keysToRemove: string[] = [];

          element.forEach((value, key) => {
            const removedSecurityScheme = removedSecuritySchemes.find(
              (securityScheme) => toValue(securityScheme.name) === toValue(key),
            );

            if (isSecuritySchemeElement(removedSecurityScheme)) {
              keysToRemove.push(toValue(key));
              annotations.push(createAnnotation(value));
            }
          });

          if (!keysToRemove.length) return undefined;

          keysToRemove.forEach((key) => {
            element.remove(key);
          });

          return undefined;
        },
      },
      post() {
        removedSecuritySchemes.length = 0;
      },
    };
  };

export default securitySchemeTypeRefractorPlugin;
