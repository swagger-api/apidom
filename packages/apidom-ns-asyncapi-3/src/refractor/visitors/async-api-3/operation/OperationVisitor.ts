import { Mixin } from 'ts-mixer';
import { isStringElement, ObjectElement } from '@swagger-api/apidom-core';
import { always } from 'ramda';

import OperationElement from '../../../../elements/Operation.ts';
import FixedFieldsVisitor, { SpecPath } from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor from '../../FallbackVisitor.ts';
/**
 * @public
 */
class OperationVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public element: OperationElement;
  declare protected readonly specPath: SpecPath<['document', 'objects', 'Operation']>;
  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: any) {
    super(options);
    this.element = new OperationElement();
    this.specPath = always(['document', 'objects', 'Operation']);
    this.canSupportSpecificationExtensions = true;
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);

    const action = objectElement.get('action');

    if (isStringElement(action)) {
      const actionValue = action.toValue();
      if (actionValue === 'send' || actionValue === 'receive') {
        this.element.setMetaProperty('operation-action', actionValue);
      }
    }

    return result;
  }
}

export default OperationVisitor;
