import { OpenApi3_1Element } from '@swagger-api/apidom-ns-openapi-3-1';
import { AnnotationElement } from '@swagger-api/apidom-core';

type WebhooksRefractorPluginOptions = {
  annotations: AnnotationElement[];
};

const webhooksRefractorPlugin =
  ({ annotations }: WebhooksRefractorPluginOptions) =>
  () => {
    const annotation = new AnnotationElement(
      'Webhooks are not supported in OpenAPI 3.0.3. They will be removed from the converted document.',
      { classes: ['warning'] },
      { code: 'webhooks' },
    );

    return {
      visitor: {
        OpenApi3_1Element(element: OpenApi3_1Element) {
          if (!element.hasKey('webhooks')) return undefined;

          annotations.push(annotation);
          element.remove('webhooks');

          return undefined;
        },
      },
    };
  };

export default webhooksRefractorPlugin;
