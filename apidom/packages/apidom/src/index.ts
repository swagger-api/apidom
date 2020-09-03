import { NamespacePlugin, Element } from 'minim';
import { isPlainObject } from 'ramda-adjunct';
import { Namespace as ApiDOMNamespace } from './namespace';

export { default as namespace, Namespace } from './namespace';
export { default as AnnotationElement } from './elements/Annotation';
export { default as CommentElement } from './elements/Comment';
export { default as ParseResultElement } from './elements/ParseResult';
export { default as SourceMapElement } from './elements/SourceMap';

export {
  isElement,
  isStringElement,
  isNumberElement,
  isNullElement,
  isBooleanElement,
  isArrayElement,
  isObjectElement,
  isMemberElement,
  isLinkElement,
  isRefElement,
} from './predicates';
export { default as createPredicate } from './predicates/helpers';

export { ArraySlice } from 'minim';
export { filter, reject, find, some } from './traversal';

export const createNamespace = (namespacePlugin?: NamespacePlugin): ApiDOMNamespace => {
  const namespace = new ApiDOMNamespace();

  if (isPlainObject(namespacePlugin)) {
    namespace.use(namespacePlugin);
  }

  return namespace;
};

export const toJSON = (namespace: ApiDOMNamespace, element: Element): JSON =>
  namespace.toRefract(element);

export const toJSONString = (namespace: ApiDOMNamespace, element: Element): string =>
  JSON.stringify(toJSON(namespace, element));

export const fromJSON = (namespace: ApiDOMNamespace, json: JSON): Element =>
  namespace.fromRefract(json);

export const fromJSONString = (namespace: ApiDOMNamespace, jsonString: string): Element =>
  fromJSON(namespace, JSON.parse(jsonString));

// Reconstructs the ApiDOM into JavaScript POJO.
// This POJO would be  the result of parsing the original
// JSON string with JSON.parse function.
export const toValue = (element: Element): any => element.toValue();
