import { OpenApi3_1Element } from '@swagger-api/apidom-ns-openapi-3-1';
import { AnnotationElement, cloneShallow } from '@swagger-api/apidom-core';

type WebhooksRefractorPluginOptions = {
  annotations: AnnotationElement[];
};

const webhooksRefractorPlugin =
  ({ annotations }: WebhooksRefractorPluginOptions) =>
  () => ({
    visitor: {
      OpenApi3_1Element(element: OpenApi3_1Element) {
        if (!element.hasKey('webhooks')) return undefined;

        const copy = cloneShallow(element);
        const annotation = new AnnotationElement(
          'Webhooks are not supported in OpenAPI 3.0.3. They will be removed from the converted document.',
          { classes: ['warning'] },
          { code: 'webhooks' },
        );

        annotations.push(annotation);
        copy.remove('webhooks');

        return copy;
      },
    },
  });

export default webhooksRefractorPlugin;
