import stampit from 'stampit';
// @ts-ignore
import { ObjectVisitor as JsonObjectVisitor } from 'apidom-parser-adapter-json';

import { isOpenApiExtension } from '../../predicates';

// @ts-ignore
export { ArrayVisitor, ValueVisitor } from 'apidom-parser-adapter-json';

const ObjectVisitor = stampit(JsonObjectVisitor, {
  init() {
    this.specificationExtensionPredicate = isOpenApiExtension({});
  },
});

export default ObjectVisitor;
