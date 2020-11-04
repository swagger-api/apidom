export { default as parse, namespace } from './parser/index-browser';
export { detect, mediaTypes } from './adapter';

export { default as specification } from './parser/specification';
export { addSourceMap } from './parser/source-map';
export { appendMetadata } from './parser/metadata';
export { hasKey, hasKeys } from './parser/predicates';

export { default as Visitor } from './parser/visitors/Visitor';
export { default as SpecificationVisitor } from './parser/visitors/SpecificationVisitor';
export { default as ErrorVisitor } from './parser/visitors/ErrorVisitor';
export { default as DocumentVisitor } from './parser/visitors/DocumentVisitor';

export {
  ScalarVisitor,
  SequenceVisitor,
  MappingVisitor,
  KindVisitor,
} from './parser/visitors/generics';
export { default as AlternatingVisitor } from './parser/visitors/generics/AlternatingVisitor';
export { default as FixedFieldsYamlMappingVisitor } from './parser/visitors/generics/FixedFieldsYamlMappingVisitor';
export { default as MapYamlMappingVisitor } from './parser/visitors/generics/MapYamlMappingVisitor';
export { default as MixedFieldsYamlMappingVisitor } from './parser/visitors/generics/MixedFieldsYamlMappingVisitor';
export { default as PatternedFieldsYamlMappingVisitor } from './parser/visitors/generics/PatternedFieldsYamlMappingVisitor';

export { visit, BREAK, keyMap } from './parser/visitors';
