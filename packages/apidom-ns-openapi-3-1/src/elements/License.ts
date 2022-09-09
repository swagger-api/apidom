import { StringElement } from '@swagger-api/apidom-core';
import { LicenseElement } from '@swagger-api/apidom-ns-openapi-3-0';

class License extends LicenseElement {
  get identifier(): StringElement | undefined {
    return this.get('identifier');
  }

  set identifier(name: StringElement | undefined) {
    this.set('identifier', name);
  }
}

export default License;
