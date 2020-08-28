import { Attributes, Meta, ObjectElement, StringElement } from 'minim';
import ServerVariable from './ServerVariable';

class Server extends ObjectElement {
  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'server';
  }

  get url(): StringElement {
    return this.get('url');
  }

  set url(url: StringElement) {
    this.set('url', url);
  }

  get description(): StringElement {
    return this.get('description');
  }

  set description(description: StringElement) {
    this.set('description', description);
  }

  get variables(): ServerVariable {
    return this.get('variables');
  }

  set variables(variables: ServerVariable) {
    this.set('variables', variables);
  }
}

export default Server;
