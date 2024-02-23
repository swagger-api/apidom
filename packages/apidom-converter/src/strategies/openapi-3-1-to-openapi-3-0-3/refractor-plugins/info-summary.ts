import { InfoElement } from '@swagger-api/apidom-ns-openapi-3-1';
import { AnnotationElement } from '@swagger-api/apidom-core';

type InfoSummaryPluginOptions = {
  annotations: AnnotationElement[];
};

const infoSummaryRefractorPlugin =
  ({ annotations }: InfoSummaryPluginOptions) =>
  () => {
    const annotation = new AnnotationElement(
      'The "summary" field of Info Object is not supported in OpenAPI 3.0.3. It has been removed from the converted document.',
      { classes: ['warning'] },
      { code: 'info-summary' },
    );

    return {
      visitor: {
        InfoElement(element: InfoElement) {
          if (!element.hasKey('summary')) return undefined;

          annotations.push(annotation);
          element.remove('summary');

          return undefined;
        },
      },
    };
  };

export default infoSummaryRefractorPlugin;
