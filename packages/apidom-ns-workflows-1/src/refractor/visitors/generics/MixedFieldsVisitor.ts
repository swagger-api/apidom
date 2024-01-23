import { Mixin } from 'ts-mixer';
import { difference } from 'ramda';
import { ObjectElement, BREAK, Element } from '@swagger-api/apidom-core';

import FixedFieldsVisitor from './FixedFieldsVisitor';
import PatternedFieldsVisitor from './PatternedFieldsVisitor';

class MixedFieldsVisitor extends Mixin(FixedFieldsVisitor, PatternedFieldsVisitor) {
  public specPathFixedFields!: (element: Element) => string[];

  public specPathPatternedFields!: (element: Element) => string[];

  ObjectElement(objectElement: ObjectElement) {
    const { specPath, ignoredFields } = this;

    try {
      this.specPath = this.specPathFixedFields;
      const fixedFields = this.retrieveFixedFields(this.specPath(objectElement));
      // let FixedFieldsVisitor only process fixed fields and leave rest to PatternedFieldsVisitor
      // @ts-ignore
      this.ignoredFields = [...ignoredFields, ...difference(objectElement.keys(), fixedFields)];
      new FixedFieldsVisitor().ObjectElement.call(this, objectElement);

      this.specPath = this.specPathPatternedFields;
      this.ignoredFields = fixedFields;
      new PatternedFieldsVisitor().ObjectElement.call(this, objectElement);
    } catch (e) {
      this.specPath = specPath;
      throw e;
    }

    return BREAK;
  }
}

export default MixedFieldsVisitor;
