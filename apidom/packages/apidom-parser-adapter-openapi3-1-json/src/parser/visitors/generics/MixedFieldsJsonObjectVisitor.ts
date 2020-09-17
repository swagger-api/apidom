import stampit from 'stampit';
import { noop } from 'ramda-adjunct';

import { BREAK } from '..';
import FixedFieldsJsonObjectVisitor from './FixedFieldsJsonObjectVisitor';
import PatternedFieldsJsonObjectVisitor from './PatternedFieldsJsonObjectVisitor';

const MixedFieldsJsonObjectVisitor = stampit(
  FixedFieldsJsonObjectVisitor,
  PatternedFieldsJsonObjectVisitor,
  {
    props: {
      specPathFixedFields: noop,
      specPathPatternedFields: noop,
    },
    methods: {
      object(objectNode) {
        const { specPath } = this;

        try {
          this.specPath = this.specPathFixedFields;
          // @ts-ignore
          FixedFieldsJsonObjectVisitor.compose.methods.object.call(this, objectNode);

          this.specPath = this.specPathPatternedFields;
          // @ts-ignore
          PatternedFieldsJsonObjectVisitor.compose.methods.object.call(this, objectNode);
        } catch (e) {
          this.specPath = specPath;
          throw e;
        }

        return BREAK;
      },
    },
  },
);

export default MixedFieldsJsonObjectVisitor;
