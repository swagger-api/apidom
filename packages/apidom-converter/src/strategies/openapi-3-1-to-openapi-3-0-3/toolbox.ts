import { Element, Meta, Attributes, AnnotationElement } from '@swagger-api/apidom-core';
import { createToolbox as createToolboxOpenAPI31 } from '@swagger-api/apidom-ns-openapi-3-1';

const createToolbox = () => {
  const openAPI31Toolbox = createToolboxOpenAPI31();

  const copySourceMap = <T extends Element, U extends Element>(from: T, to: U): void => {
    if (openAPI31Toolbox.predicates.hasElementSourceMap(from)) {
      to.meta.set('sourceMap', from.meta.get('sourceMap'));
    }
  };

  const createAnnotation = (content?: string, meta?: Meta, attributes?: Attributes) => {
    return new AnnotationElement(content, meta, attributes);
  };
  createAnnotation.fromElement = <T extends Element>(
    element: T,
    content?: string,
    meta?: Meta,
    attributes?: Attributes,
  ) => {
    const annotation = createAnnotation(content, meta, attributes);
    copySourceMap(element, annotation);
    return annotation;
  };

  return {
    ...openAPI31Toolbox,
    copySourceMap,
    createAnnotation,
  };
};

export type Toolbox = ReturnType<typeof createToolbox>;

export default createToolbox;
