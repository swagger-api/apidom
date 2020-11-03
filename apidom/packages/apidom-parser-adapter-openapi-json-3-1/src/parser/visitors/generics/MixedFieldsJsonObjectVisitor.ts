import stampit from 'stampit';
// @ts-ignore
import { MixedFieldsJsonObjectVisitor as BaseVisitor } from 'apidom-parser-adapter-json';

import { isOpenApiExtension } from '../../predicates';

const MixedFieldsJsonObjectVisitor = stampit(BaseVisitor, {
  props: {
    specificationExtensionPredicate: isOpenApiExtension({}),
  },
});

export default MixedFieldsJsonObjectVisitor;
