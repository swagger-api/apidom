import { has } from 'ramda';
import { isPlainObject, isString } from 'ramda-adjunct';
import { Element, Namespace as INamespace } from 'minim';

import defaultNamespaceInstance from './namespace';
import serializeValue from './serializers/value';
import serializeJSON from './serializers/json';
import serializeYAML from './serializers/yaml-1-2';

export { dispatchPlugins as dispatchRefractorPlugins } from './refractor/plugins/utils';
export { default as refractorPluginElementIdentity } from './refractor/plugins/element-identity';
export { default as refractorPluginSemanticElementIdentity } from './refractor/plugins/semantic-element-identity';

export { default as MediaTypes } from './media-types';

export { Element, MemberElement, KeyValuePair, ObjectSlice, ArraySlice, refract } from 'minim';
export type { NamespacePluginOptions, Attributes, Meta } from 'minim';
export type { PositionRange, Position } from './elements/SourceMap';
export { default as namespace, Namespace, createNamespace } from './namespace';

export {
  ObjectElement,
  ArrayElement,
  BooleanElement,
  NullElement,
  NumberElement,
  StringElement,
  LinkElement,
  RefElement,
  AnnotationElement,
  CommentElement,
  ParseResultElement,
  SourceMapElement,
} from './refractor/registration';

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
  isAnnotationElement,
  isParseResultElement,
  isSourceMapElement,
  isPrimitiveElement,
  hasElementSourceMap,
  includesSymbols,
  includesClasses,
} from './predicates/index';
export { default as createPredicate } from './predicates/helpers';

export { filter, reject, find, findAtOffset, some, traverse, parents } from './traversal/index';
export {
  visit,
  BREAK,
  mergeAllVisitors,
  getNodeType,
  keyMapDefault as keyMap,
} from './traversal/visitor';
export { transclude, default as Transcluder } from './transcluder/index';
export { dereference } from './util';
export { cloneShallow, cloneDeep } from './clone';
export { default as CloneError } from './clone/errors/CloneError';
export { default as DeepCloneError } from './clone/errors/DeepCloneError';
export { default as ShallowCloneError } from './clone/errors/ShallowCloneError';

/**
 * Transforms data to an Element from a particular namespace.
 */
export const from = (data: any, namespace: INamespace = defaultNamespaceInstance): Element => {
  if (isString(data)) {
    // JSON serialized refract
    try {
      return namespace.fromRefract(JSON.parse(data));
    } catch {
      // noop
    }
  }
  if (isPlainObject(data) && has('element', data)) {
    // refract javascript structure
    return namespace.fromRefract(data);
  }

  return namespace.toElement(data);
};

/**
 * Transforms the ApiDOM into JavaScript POJO.
 * This POJO would be the result of interpreting the ApiDOM
 * into JavaScript structure.
 */
export const toValue = serializeValue;

/**
 * Transforms the ApiDOM into JSON string.
 */
export const toJSON = serializeJSON;

/**
 * Transforms the ApiDOM into YAML string.
 */
export const toYAML = serializeYAML;

/**
 * Creates a refract representation of an Element.
 * https://github.com/refractproject/refract-spec
 */
export const dehydrate = (
  element: Element,
  namespace: INamespace = defaultNamespaceInstance,
): any => {
  return namespace.toRefract(element);
};

/**
 * Create a refracted string representation of an Element.
 */
export const toString = (
  element: Element,
  namespace: INamespace = defaultNamespaceInstance,
): string => {
  const refractStructure = dehydrate(element, namespace);
  return JSON.stringify(refractStructure);
};

export { default as sexprs } from './sexprs';
export { default as deepmerge } from './deepmerge';
