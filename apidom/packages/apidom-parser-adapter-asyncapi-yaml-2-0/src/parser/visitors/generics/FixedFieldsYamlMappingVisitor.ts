import stampit from 'stampit';
// @ts-ignore
import { FixedFieldsYamlMappingVisitor as BaseVisitor } from 'apidom-parser-adapter-yaml-1-2';

import { isAsyncApiExtension } from '../../predicates';

const FixedFieldsYamlMappingVisitor = stampit(BaseVisitor, {
  props: {
    specificationExtensionPredicate: isAsyncApiExtension({}),
  },
});

export default FixedFieldsYamlMappingVisitor;
