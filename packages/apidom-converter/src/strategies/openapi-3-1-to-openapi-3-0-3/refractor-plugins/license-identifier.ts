import { LicenseElement } from '@swagger-api/apidom-ns-openapi-3-1';
import { AnnotationElement } from '@swagger-api/apidom-core';

type LicenseIdentifierPluginOptions = {
  annotations: AnnotationElement[];
};

const licenseIdentifierRefractorPlugin =
  ({ annotations }: LicenseIdentifierPluginOptions) =>
  () => {
    const annotation = new AnnotationElement(
      'The "identifier" field of License Object is not supported in OpenAPI 3.0.3. It has been removed from the converted document.',
      { classes: ['warning'] },
      { code: 'license-identifier' },
    );

    return {
      visitor: {
        LicenseElement(element: LicenseElement) {
          if (!element.hasKey('identifier')) return undefined;

          annotations.push(annotation);
          element.remove('identifier');

          return undefined;
        },
      },
    };
  };

export default licenseIdentifierRefractorPlugin;
