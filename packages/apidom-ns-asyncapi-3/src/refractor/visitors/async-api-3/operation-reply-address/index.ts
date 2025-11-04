// filepath: packages/apidom-ns-asyncapi-3/src/refractor/visitors/operation/OperationReplyAddressVisitor.ts
import { Mixin } from 'ts-mixer';
import { ObjectElement } from '@swagger-api/apidom-core';

import OperationReplyAddressElement from '../../../../elements/OperationReplyAddress.ts';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor from '../../FallbackVisitor.ts';
import { always } from 'ramda';

/**
 * @public
 */
class OperationReplyAddressVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: OperationReplyAddressElement;

  constructor(options: any) {
    super(options);
    this.element = new OperationReplyAddressElement();
		this.specPath = always(['document', 'objects', 'OperationReplyAddress']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default OperationReplyAddressVisitor;