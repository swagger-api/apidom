import stampit from 'stampit';

import { BREAK } from '..';
import FixedFieldsJsonObjectVisitor from './FixedFieldsJsonObjectVisitor';
import PatternedFieldsJsonObjectVisitor from './PatternedFieldsJsonObjectVisitor';

const MixedFieldsJsonObjectVisitor = stampit(
  FixedFieldsJsonObjectVisitor,
  PatternedFieldsJsonObjectVisitor,
  {
    methods: {
      object(objectNode) {
        // @ts-ignore
        FixedFieldsJsonObjectVisitor.compose.methods.object.call(this, objectNode);
        // @ts-ignore
        PatternedFieldsJsonObjectVisitor.compose.methods.object.call(this, objectNode);

        return BREAK;
      },
    },
  },
);

export default MixedFieldsJsonObjectVisitor;
