import stampit from 'stampit';
// @ts-ignore
import { PatternedFieldsJsonObjectVisitor as BaseVisitor } from 'apidom-parser-adapter-json';

import { isOpenApiExtension } from '../../predicates';

const PatternedFieldsJsonObjectVisitor = stampit(BaseVisitor, {
  props: {
    specificationExtensionPredicate: isOpenApiExtension({}),
  },
});

export default PatternedFieldsJsonObjectVisitor;
