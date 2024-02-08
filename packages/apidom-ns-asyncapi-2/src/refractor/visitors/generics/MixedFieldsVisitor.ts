import { Mixin } from 'ts-mixer';
import { difference } from 'ramda';
import { ObjectElement, BREAK } from '@swagger-api/apidom-core';

import FixedFieldsVisitor, { FixedFieldsVisitorOptions, SpecPath } from './FixedFieldsVisitor';
import PatternedFieldsVisitor, { PatternedFieldsVisitorOptions } from './PatternedFieldsVisitor';

export type { SpecPath };

export interface MixedFieldsVisitorOptions
  extends FixedFieldsVisitorOptions,
    PatternedFieldsVisitorOptions {
  readonly specPathFixedFields: SpecPath;
  readonly specPathPatternedFields: SpecPath;
}

class MixedFieldsVisitor extends Mixin(FixedFieldsVisitor, PatternedFieldsVisitor) {
  protected specPathFixedFields: SpecPath;

  protected specPathPatternedFields: SpecPath;

  constructor({
    specPathFixedFields,
    specPathPatternedFields,
    ...rest
  }: MixedFieldsVisitorOptions) {
    super({ ...rest });
    this.specPathFixedFields = specPathFixedFields;
    this.specPathPatternedFields = specPathPatternedFields;
  }

  ObjectElement(objectElement: ObjectElement) {
    const { specPath, ignoredFields } = this;

    try {
      this.specPath = this.specPathFixedFields;
      const fixedFields = this.retrieveFixedFields(this.specPath(objectElement));
      // let FixedFieldsVisitor only process fixed fields and leave rest to PatternedFieldsVisitor
      // @ts-ignore
      this.ignoredFields = [...ignoredFields, ...difference(objectElement.keys(), fixedFields)];
      FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);

      this.specPath = this.specPathPatternedFields;
      this.ignoredFields = fixedFields;
      PatternedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);
    } catch (e) {
      this.specPath = specPath;
      throw e;
    }

    return BREAK;
  }
}

export default MixedFieldsVisitor;
