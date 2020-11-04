import stampit from 'stampit';
// @ts-ignore
import { PatternedFieldsJsonObjectVisitor as BaseVisitor } from 'apidom-parser-adapter-json';

import { isAsyncApiExtension } from '../../predicates';

const PatternedFieldsJsonObjectVisitor = stampit(BaseVisitor, {
  props: {
    specificationExtensionPredicate: isAsyncApiExtension({}),
  },
});

export default PatternedFieldsJsonObjectVisitor;
