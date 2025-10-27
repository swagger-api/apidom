// filepath: packages/apidom-ns-asyncapi-3/src/refractor/visitors/operation/OperationReplyVisitor.ts
import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import OperationReplyElement from '../../../../elements/OperationReply.ts';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor from '../../FallbackVisitor.ts';
import { always } from 'ramda';

class OperationReplyVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: OperationReplyElement;

  constructor(options: any) {
    super(options);
    this.element = new OperationReplyElement();
		this.specPath = always(['document', 'objects', 'OperationReply']);
    this.canSupportSpecificationExtensions = true;
  }

  ObjectElement(objectElement: ObjectElement) {
		const result = FixedFieldsVisitor.prototype.ObjectElement.call(this, objectElement);
  
    return result;
  }
}

export default OperationReplyVisitor;