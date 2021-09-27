import stampit from 'stampit';
import { difference } from 'ramda';
import { noop } from 'ramda-adjunct';
import { ObjectElement, BREAK } from '@swagger-api/apidom-core';

import FixedFieldsVisitor from './FixedFieldsVisitor';
import PatternedFieldsVisitor from './PatternedFieldsVisitor';

const MixedFieldsVisitor = stampit(FixedFieldsVisitor, PatternedFieldsVisitor, {
  props: {
    specPathFixedFields: noop,
    specPathPatternedFields: noop,
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      const { specPath, ignoredFields } = this;

      try {
        this.specPath = this.specPathFixedFields;
        const fixedFields = this.retrieveFixedFields(this.specPath(objectElement));
        // let FixedFieldsVisitor only process fixed fields and leave rest to PatternedFieldsVisitor
        this.ignoredFields = [...ignoredFields, ...difference(objectElement.keys(), fixedFields)];
        // @ts-ignore
        FixedFieldsVisitor.compose.methods.ObjectElement.call(this, objectElement);

        this.specPath = this.specPathPatternedFields;
        this.ignoredFields = fixedFields;
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
