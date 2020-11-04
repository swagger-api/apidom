import stampit from 'stampit';
// @ts-ignore
import { MappingVisitor as YamlMappingVisitor } from 'apidom-parser-adapter-yaml-1-2';

import { isAsyncApiExtension } from '../../predicates';

// @ts-ignore
export { ScalarVisitor, SequenceVisitor, KindVisitor } from 'apidom-parser-adapter-yaml-1-2';

export const MappingVisitor = stampit(YamlMappingVisitor, {
  init() {
    this.specificationExtensionPredicate = isAsyncApiExtension({});
  },
});
