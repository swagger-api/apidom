import { HeaderElement } from '@swagger-api/apidom-ns-openapi-3-1';

import SchemaElement from './Schema.ts';

/**
 * @public
 */
class Header extends HeaderElement {
  get schema(): SchemaElement | undefined {
    return this.get('schema');
  }

  set schema(schema: SchemaElement | undefined) {
    this.set('schema', schema);
  }
}

export default Header;
