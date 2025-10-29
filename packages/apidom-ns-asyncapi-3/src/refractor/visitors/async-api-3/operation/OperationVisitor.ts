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
    const result = FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement) as OperationElement;

    // Retrieve the action from the objectElement
    const action = objectElement.get('action');

    if (isStringElement(action)) {
        const actionValue = action.toValue();
        if (actionValue === 'send' || actionValue === 'receive') {
            result.setMetaProperty('operation-action', actionValue);
        } else {
            throw new Error(`Invalid action type: ${actionValue}. Expected "send" or "receive".`);
        }
    }

    // Set the element to the result after processing
    this.element = result;
    this.copyMetaAndAttributes(objectElement, this.element);

    return this.element;
}
}

export default OperationVisitor;