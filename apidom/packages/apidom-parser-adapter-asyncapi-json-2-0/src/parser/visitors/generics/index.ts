import stampit from 'stampit';
// @ts-ignore
import { ObjectVisitor as JsonObjectVisitor } from 'apidom-parser-adapter-json';

import { isAsyncApiExtension } from '../../predicates';

// @ts-ignore
export { ArrayVisitor, ValueVisitor } from 'apidom-parser-adapter-json';

export const ObjectVisitor = stampit(JsonObjectVisitor, {
  init() {
    this.specificationExtensionPredicate = isAsyncApiExtension({});
  },
});
