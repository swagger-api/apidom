import { StringElement } from '@swagger-api/apidom-core';
import { InfoElement } from '@swagger-api/apidom-ns-openapi-3-0';

import LicenseElement from './License';

class Info extends InfoElement {
  get license(): LicenseElement | undefined {
    return this.get('license');
  }

  set license(licenseElement: LicenseElement | undefined) {
    this.set('license', licenseElement);
  }

  get summary(): StringElement | undefined {
    return this.get('summary');
  }

  set summary(summary: StringElement | undefined) {
    this.set('summary', summary);
  }
}

export default Info;
