import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';
/**
 * @public
 */
class OperationMessages extends ArrayElement {
	static primaryClass = 'operation-messages';

	constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
		super(content, meta, attributes);
		this.classes.push(OperationMessages.primaryClass);
	}
}

export default OperationMessages;
