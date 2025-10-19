import { Attributes, Meta, ObjectElement, StringElement } from '@swagger-api/apidom-core';

/**
 * @public
 */
class OperationReplyAddress extends ObjectElement {
	constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
		super(content, meta, attributes);
		this.element = 'operationReplyAddress';
	}

	get description(): StringElement | undefined {
		return this.get('description');
	}

	set description(value: StringElement | undefined) {
		this.set('description', value);
	}

	get location(): StringElement | undefined {
		return this.get('location');
	}

	set location(value: StringElement | undefined) {
		this.set('location', value);
	}
}

export default OperationReplyAddress;