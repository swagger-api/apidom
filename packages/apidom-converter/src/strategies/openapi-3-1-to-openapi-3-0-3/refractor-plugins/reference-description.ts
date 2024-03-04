import { ReferenceElement } from '@swagger-api/apidom-ns-openapi-3-1';
import { AnnotationElement } from '@swagger-api/apidom-core';

type ReferenceDescriptionPluginOptions = {
  annotations: AnnotationElement[];
};

const referenceDescriptionRefractorPlugin =
  ({ annotations }: ReferenceDescriptionPluginOptions) =>
  () => {
    const annotation = new AnnotationElement(
      'The "description" field of Reference Object is not supported in OpenAPI 3.0.3. It has been removed from the converted document.',
      { classes: ['warning'] },
      { code: 'reference-description' },
    );

    return {
      visitor: {
        ReferenceElement(element: ReferenceElement) {
          if (element.hasKey('description')) {
            annotations.push(annotation);
            element.remove('description');
          }
        },
      },
    };
  };

export default referenceDescriptionRefractorPlugin;
