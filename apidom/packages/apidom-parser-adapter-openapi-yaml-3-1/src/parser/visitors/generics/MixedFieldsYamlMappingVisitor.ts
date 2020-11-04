import stampit from 'stampit';
// @ts-ignore
import { MixedFieldsYamlMappingVisitor as BaseVisitor } from 'apidom-parser-adapter-yaml-1-2';

import { isOpenApiExtension } from '../../predicates';

const MixedFieldsYamlMappingVisitor = stampit(BaseVisitor, {
  props: {
    specificationExtensionPredicate: isOpenApiExtension({}),
  },
});

export default MixedFieldsYamlMappingVisitor;
