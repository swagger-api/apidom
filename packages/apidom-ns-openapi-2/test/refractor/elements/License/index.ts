import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { LicenseElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('LicenseElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const licenseElement = LicenseElement.refract({
          name: 'Apache 2.0',
          url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
        });

        expect(sexprs(licenseElement)).toMatchSnapshot();
      });
    });
  });
});
