import { Attributes, Meta, ObjectElement } from '@swagger-api/apidom-core';

/**
 * @public
 */
class Messages extends ObjectElement {
	constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
		super(content, meta, attributes);
		this.element = 'messages';
	}
}

export default Messages;