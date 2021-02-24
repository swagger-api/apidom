import stampit from 'stampit';
import { noop } from 'ramda-adjunct';
import { ObjectElement, BREAK } from 'apidom';

import FixedFieldsVisitor from './FixedFieldsVisitor';
import PatternedFieldsVisitor from './PatternedFieldsVisitor';

const MixedFieldsVisitor = stampit(FixedFieldsVisitor, PatternedFieldsVisitor, {
  props: {
    specPathFixedFields: noop,
    specPathPatternedFields: noop,
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      const { specPath } = this;

      try {
        this.specPath = this.specPathFixedFields;
        // @ts-ignore
        FixedFieldsVisitor.compose.methods.ObjectElement.call(this, objectElement);

        this.specPath = this.specPathPatternedFields;
        // @ts-ignore
        PatternedFieldsVisitor.compose.methods.ObjectElement.call(this, objectElement);
      } catch (e) {
        this.specPath = specPath;
        throw e;
      }

      return BREAK;
    },
  },
});

export default MixedFieldsVisitor;
