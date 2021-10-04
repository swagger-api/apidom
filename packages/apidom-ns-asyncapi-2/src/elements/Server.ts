import { Attributes, Meta } from 'minim';
import { StringElement, ObjectElement } from '@swagger-api/apidom-core';

import ServerVariableElement from './ServerVariable';
import SecurityRequirementElement from './SecurityRequirement';
import ServerBindingsElement from './ServerBindings';

class Server extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'server';
  }

  get url(): StringElement {
    return this.get('url');
  }

  set url(url: StringElement) {
    this.set('url', url);
  }

  get protocol(): StringElement {
    return this.get('protocol');
  }

  set protocol(protocol: StringElement) {
    this.set('protocol', protocol);
  }

  get protocolVersion(): StringElement {
    return this.get('protocolVersion');
  }

  set protocolVersion(protocolVersion: StringElement) {
    this.set('protocolVersion', protocolVersion);
  }

  get description(): StringElement {
    return this.get('description');
  }

  set description(description: StringElement) {
    this.set('description', description);
  }

  get variables(): Record<string, ServerVariableElement> {
    return this.get('variables');
  }

  set variables(variables: Record<string, ServerVariableElement>) {
    this.set('variables', variables);
  }

  get security(): SecurityRequirementElement[] {
    return this.get('security');
  }

  set security(security: SecurityRequirementElement[]) {
    this.set('security', security);
  }

  get bindings(): ServerBindingsElement {
    return this.get('bindings');
  }

  set bindings(bindings: ServerBindingsElement) {
    this.set('bindings', bindings);
  }
}

export default Server;
