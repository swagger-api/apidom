import { ObjectElement, Attributes, Meta, StringElement } from '@swagger-api/apidom-core';
import MessagesElement from './Messages.ts';
import type { ArrayElement } from '@swagger-api/apidom-core';
import ParametersElement from './Parameters.ts';
import TagsElement from './Tags.ts';
import ExternalDocumentationElement from './ExternalDocumentation.ts';
import ReferenceElement from './Reference.ts';
import ChannelBindingsElement from './ChannelBindings.ts';

/**
 * @public
 */
class Channel extends ObjectElement {
	constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
		super(content, meta, attributes);
		this.element = 'channel';
	}

	get address(): StringElement | null {
     return this.get('address');
   }
 
  set address(address: StringElement | null) {
     this.set('address', address);
  }

	get messages(): MessagesElement | undefined {
		return this.get('messages');
	}

	set messages(messages: MessagesElement | undefined) {
		this.set('messages', messages);
	}

	get title(): StringElement | undefined {
		return this.get('title');
	}
	set title(title: StringElement | undefined) {
		this.set('title', title);
	}

	get description(): StringElement | undefined {
		return this.get('description');
	}
	set description(description: StringElement | undefined) {
		this.set('description', description);
	}

	get summary(): StringElement | undefined {
		return this.get('summary');
	}
	set summary(summary: StringElement | undefined) {
		this.set('summary', summary);
	}

	get servers(): ArrayElement | undefined {
		return this.get('servers');
	}

	set servers(servers: import('@swagger-api/apidom-core').ArrayElement | undefined) {
		this.set('servers', servers);
	}

	get parameters(): ParametersElement | undefined {
		return this.get('parameters');
	}
	set parameters(parameters: ParametersElement | undefined) {
		this.set('parameters', parameters);
	}

	get tags(): TagsElement | undefined {
		return this.get('tags');
	}
	set tags(tags: TagsElement | undefined) {
		this.set('tags', tags);
	}

	get externalDocs(): ExternalDocumentationElement | ReferenceElement | undefined {
		return this.get('externalDocs');
	}
	set externalDocs(externalDocs: ExternalDocumentationElement | ReferenceElement | undefined) {
		this.set('externalDocs', externalDocs);
	}

  get bindings(): ChannelBindingsElement | undefined {
    return this.get('bindings');
  }

  set bindings(bindings: ChannelBindingsElement | undefined) {
    this.set('bindings', bindings);
  }

}

export default Channel;