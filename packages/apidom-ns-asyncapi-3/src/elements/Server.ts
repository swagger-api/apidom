import { Attributes, Meta, ObjectElement, StringElement } from '@swagger-api/apidom-core';
import { ServerElement } from '@swagger-api/apidom-ns-asyncapi-2';
import ExternalDocumentationElement from './ExternalDocumentation.ts';
import ReferenceElement from './Reference.ts';
import { UnsupportedOperationError } from '@swagger-api/apidom-error';

/**
 * @public
 */
class Server extends ServerElement {
	constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'server';
  }

	get url(): ObjectElement | undefined {
		throw new UnsupportedOperationError(
			'url keyword from Core vocabulary has been removed',
		);
	}

	set url(url: ObjectElement | undefined) {
		throw new UnsupportedOperationError(
			'url keyword from Core vocabulary has been removed',
		);
	}

	get host(): StringElement | undefined {
		return this.get('host');
  }

  set host(host: StringElement | undefined) {
    this.set('host', host);
  }

	get pathName(): StringElement | undefined {
		return this.get('pathName');
	}

	set pathName(pathName: StringElement | undefined) {
		this.set('pathName', pathName);
	}

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

	get title(): StringElement | undefined {
		return this.get('title');
	}

	set title(title: StringElement | undefined) {
		this.set('title', title);
	}

	get summary(): StringElement | undefined {
		return this.get('summary');
	}

	set summary(summary: StringElement | undefined) {
		this.set('summary', summary);
	}
	
	get externalDocs(): ExternalDocumentationElement | ReferenceElement |  undefined {
    return this.get('externalDocs');
  }

  set externalDocs(externalDocs: ExternalDocumentationElement | ReferenceElement | undefined) {
    this.set('externalDocs', externalDocs);
  }
}

export default Server;
