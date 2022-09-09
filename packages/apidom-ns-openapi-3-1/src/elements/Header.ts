import { HeaderElement } from '@swagger-api/apidom-ns-openapi-3-0';

import SchemaElement from './Schema';

class Header extends HeaderElement {
  get schema(): SchemaElement | undefined {
    return this.get('schema');
  }

  set schema(schema: SchemaElement | undefined) {
    this.set('schema', schema);
  }
}

export default Header;
