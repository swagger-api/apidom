import stampit from 'stampit';
// @ts-ignore
import { FixedFieldsJsonObjectVisitor as BaseVisitor } from 'apidom-parser-adapter-json';

import { isOpenApiExtension } from '../../predicates';

const FixedFieldsJsonObjectVisitor = stampit(BaseVisitor, {
  props: {
    specificationExtensionPredicate: isOpenApiExtension({}),
  },
});

export default FixedFieldsJsonObjectVisitor;
