import { ArrayElement, Attributes, Meta, ObjectElement, StringElement } from '@swagger-api/apidom-core';
import { ServerBindingsElement } from '@swagger-api/apidom-ns-asyncapi-2';
import TagsElement from './Tags.ts';
import ExternalDocumentationElement from './ExternalDocumentation.ts';
import ReferenceElement from './Reference.ts';

/**
 * @public
 */
class Server extends ObjectElement {
	constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'server';
  }

	get host(): StringElement | undefined {
    return this.get('host');
  }

  set host(host: StringElement | undefined) {
    this.set('host', host);
  }

	get protocol(): StringElement | undefined {
    return this.get('protocol');
  }

  set protocol(protocol: StringElement | undefined) {
    this.set('protocol', protocol);
  }

  get protocolVersion(): StringElement | undefined {
    return this.get('protocolVersion');
  }

  set protocolVersion(protocolVersion: StringElement | undefined) {
    this.set('protocolVersion', protocolVersion);
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

  get variables(): ObjectElement | undefined {
    return this.get('variables');
  }

  set variables(variables: ObjectElement | undefined) {
    this.set('variables', variables);
  }

	get security(): ArrayElement | undefined {
    return this.get('security');
  }

  set security(security: ArrayElement | undefined) {
    this.set('security', security);
  }
	
	get tags(): TagsElement | undefined {
		return this.get('tags');
	}

	set tags(tags: TagsElement | undefined) {
		this.set('tags', tags);
	}
	
	get externalDocs(): ExternalDocumentationElement | ReferenceElement |  undefined {
    return this.get('externalDocs');
  }

  set externalDocs(externalDocs: ExternalDocumentationElement | ReferenceElement | undefined) {
    this.set('externalDocs', externalDocs);
  }

  get bindings(): ServerBindingsElement | undefined {
    return this.get('bindings');
  }

  set bindings(bindings: ServerBindingsElement | undefined) {
    this.set('bindings', bindings);
  }

}

export default Server;
