import { NamespacePlugin, Namespace, Element } from 'minim';
import { Namespace as ApiDOMNamespace } from './namespace';

export { default as namespace } from './namespace';
export { default as AnnotationElement } from './elements/Annotation';
export { default as CommentElement } from './elements/Comment';
export { default as ParseResultElement } from './elements/ParseResult';
export { default as SourceMapElement } from './elements/SourceMap';

export const createNamespace = (namespacePlugin: NamespacePlugin): Namespace => {
  const namespace = new ApiDOMNamespace();
  namespace.use(namespacePlugin);
  return namespace;
};

export const toJSON = (namespace: Namespace, element: Element): JSON =>
  namespace.toRefract(element);

export const toJSONString = (namespace: Namespace, element: Element): string =>
  JSON.stringify(toJSON(namespace, element));

export const fromJSON = (namespace: Namespace, json: JSON): Element => namespace.fromRefract(json);

export const fromJSONString = (namespace: Namespace, jsonString: string): Element =>
  fromJSON(namespace, JSON.parse(jsonString));

// Reconstructs the ApiDOM into JavaScript POJO.
// This POJO would be  the result of parsing the original
// JSON string with JSON.parse function.
export const toValue = (element: Element): any => element.toValue();
