import stampit from 'stampit';
// @ts-ignore
import { MixedFieldsJsonObjectVisitor as BaseVisitor } from 'apidom-parser-adapter-json';

import { isAsyncApiExtension } from '../../predicates';

const MixedFieldsJsonObjectVisitor = stampit(BaseVisitor, {
  props: {
    specificationExtensionPredicate: isAsyncApiExtension({}),
  },
});

export default MixedFieldsJsonObjectVisitor;
