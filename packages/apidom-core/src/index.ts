export { dispatchPluginsSync as dispatchRefractorPlugins } from './refractor/plugins/dispatcher/index.ts';
export type {
  DispatchPluginsSync,
  DispatchPluginsAsync,
  DispatchPluginsOptions,
} from './refractor/plugins/dispatcher/index.ts';

export { default as refractorPluginElementIdentity } from './refractor/plugins/element-identity.ts';
export { default as refractorPluginSemanticElementIdentity } from './refractor/plugins/semantic-element-identity.ts';

export { default as MediaTypes } from './media-types.ts';

export { Element, MemberElement, KeyValuePair, ObjectSlice, ArraySlice, refract } from 'minim';
export type { NamespacePluginOptions, Attributes, Meta } from 'minim';
export type { PositionRange, Position } from './elements/SourceMap.ts';
export { default as namespace, Namespace, createNamespace } from './namespace.ts';

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
} from './refractor/registration.ts';

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
} from './predicates/index.ts';
export type { ElementPredicate } from './predicates/helpers.ts';
export { default as createPredicate } from './predicates/helpers.ts';

export { filter, reject, find, findAtOffset, some, traverse, parents } from './traversal/index.ts';
export {
  visit,
  BREAK,
  mergeAllVisitors,
  getNodeType,
  cloneNode,
  keyMapDefault as keyMap,
} from './traversal/visitor.ts';

export { transclude, default as Transcluder } from './transcluder/index.ts';

export { dereference } from './util.ts';

export { cloneShallow, cloneDeep } from './clone/index.ts';
export { default as CloneError } from './clone/errors/CloneError.ts';
export { default as DeepCloneError } from './clone/errors/DeepCloneError.ts';
export { default as ShallowCloneError } from './clone/errors/ShallowCloneError.ts';

export { defaultIdentityManager, IdentityManager } from './identity/index.ts';
export { default as ElementIdentityError } from './identity/errors/ElementIdentityError.ts';

/**
 * Transforms data to an Element from a particular namespace.
 */
export { default as from } from './transformers/from.ts';

/**
 * Transforms the ApiDOM into JavaScript POJO.
 * This POJO would be the result of interpreting the ApiDOM
 * into JavaScript structure.
 */
export { default as toValue } from './transformers/serializers/value/index.ts';

/**
 * Transforms the ApiDOM into JSON string.
 */
export { default as toJSON } from './transformers/serializers/json.ts';

/**
 * Transforms the ApiDOM into YAML string.
 */
export { default as toYAML } from './transformers/serializers/yaml-1-2.ts';

/**
 * Creates a refract representation of an Element.
 * https://github.com/refractproject/refract-spec
 */
export { default as dehydrate } from './transformers/dehydrate.ts';

/**
 * Create a refracted string representation of an Element.
 */
export { default as toString } from './transformers/to-string.ts';

export { default as sexprs } from './transformers/sexprs.ts';

export { default as deepmerge } from './merge/deepmerge.ts';
export type { DeepMergeUserOptions, ObjectOrArrayElement } from './merge/deepmerge.ts';
export { default as mergeRight } from './merge/merge-right.ts';
export type { MergeRightOptions } from './merge/merge-right.ts';
export { default as mergeLeft } from './merge/merge-left.ts';
export type { MergeRightOptions as MergeLeftOptions } from './merge/merge-right.ts';
