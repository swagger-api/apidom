export { dispatchPluginsSync as dispatchRefractorPlugins } from './refractor/plugins/utils';
export type {
  DispatchPluginsSync,
  DispatchPluginsAsync,
  DispatchPluginsOptions,
} from './refractor/plugins/utils';

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
export type { ElementPredicate } from './predicates/helpers';
export { default as createPredicate } from './predicates/helpers';

export { filter, reject, find, findAtOffset, some, traverse, parents } from './traversal/index';
export {
  visit,
  BREAK,
  mergeAllVisitors,
  getNodeType,
  cloneNode,
  keyMapDefault as keyMap,
} from './traversal/visitor';

export { transclude, default as Transcluder } from './transcluder/index';

export { dereference } from './util';

export { cloneShallow, cloneDeep } from './clone';
export { default as CloneError } from './clone/errors/CloneError';
export { default as DeepCloneError } from './clone/errors/DeepCloneError';
export { default as ShallowCloneError } from './clone/errors/ShallowCloneError';

export { defaultIdentityManager, IdentityManager } from './identity';
export { default as ElementIdentityError } from './identity/errors/ElementIdentityError';

/**
 * Transforms data to an Element from a particular namespace.
 */
export { default as from } from './transformers/from';

/**
 * Transforms the ApiDOM into JavaScript POJO.
 * This POJO would be the result of interpreting the ApiDOM
 * into JavaScript structure.
 */
export { default as toValue } from './transformers/serializers/value';

/**
 * Transforms the ApiDOM into JSON string.
 */
export { default as toJSON } from './transformers/serializers/json';

/**
 * Transforms the ApiDOM into YAML string.
 */
export { default as toYAML } from './transformers/serializers/yaml-1-2';

/**
 * Creates a refract representation of an Element.
 * https://github.com/refractproject/refract-spec
 */
export { default as dehydrate } from './transformers/dehydrate';

/**
 * Create a refracted string representation of an Element.
 */
export { default as toString } from './transformers/to-string';

export { default as sexprs } from './transformers/sexprs';

export { default as deepmerge } from './merge/deepmerge';
export type { DeepMergeUserOptions, ObjectOrArrayElement } from './merge/deepmerge';
export { default as mergeRight } from './merge/merge-right';
export type { MergeRightOptions } from './merge/merge-right';
export { default as mergeLeft } from './merge/merge-left';
export type { MergeRightOptions as MergeLeftOptions } from './merge/merge-right';
