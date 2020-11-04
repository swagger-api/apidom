import stampit from 'stampit';
// @ts-ignore
import { FixedFieldsJsonObjectVisitor as BaseVisitor } from 'apidom-parser-adapter-json';

import { isAsyncApiExtension } from '../../predicates';

const FixedFieldsJsonObjectVisitor = stampit(BaseVisitor, {
  props: {
    specificationExtensionPredicate: isAsyncApiExtension({}),
  },
});

export default FixedFieldsJsonObjectVisitor;
