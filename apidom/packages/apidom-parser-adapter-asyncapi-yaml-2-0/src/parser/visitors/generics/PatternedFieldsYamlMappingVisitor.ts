import stampit from 'stampit';
// @ts-ignore
import { PatternedFieldsYamlMappingVisitor as BaseVisitor } from 'apidom-parser-adapter-yaml-1-2';

import { isAsyncApiExtension } from '../../predicates';

const PatternedFieldsYamlMappingVisitor = stampit(BaseVisitor, {
  props: {
    specificationExtensionPredicate: isAsyncApiExtension({}),
  },
});

export default PatternedFieldsYamlMappingVisitor;
