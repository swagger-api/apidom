import stampit from 'stampit';
import { noop } from 'ramda-adjunct';
import { ObjectElement } from 'apidom';

import { BREAK } from '../../../traversal/visitor';
import FixedFieldsVisitor from './FixedFieldsVisitor';
import PatternedFieldsVisitor from './PatternedFieldsVisitor';

const MixedFieldsVisitor = stampit(FixedFieldsVisitor, PatternedFieldsVisitor, {
  props: {
    specPathFixedFields: noop,
    specPathPatternedFields: noop,
  },
  methods: {
    object(objectElement: ObjectElement) {
      const { specPath } = this;

      try {
        this.specPath = this.specPathFixedFields;
        // @ts-ignore
        FixedFieldsVisitor.compose.methods.object.call(this, objectElement);

        this.specPath = this.specPathPatternedFields;
        // @ts-ignore
        PatternedFieldsVisitor.compose.methods.object.call(this, objectElement);
      } catch (e) {
        this.specPath = specPath;
        throw e;
      }

      return BREAK;
    },
  },
});

export default MixedFieldsVisitor;
