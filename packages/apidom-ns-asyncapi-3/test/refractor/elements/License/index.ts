import { expect } from 'chai';
import { sexprs, includesClasses, ObjectElement } from '@swagger-api/apidom-core';

import { LicenseElement } from '../../../../src/index.ts';

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

      context('given specification extensions', function () {
        specify('should refract x- extension properties', function () {
          const licenseElement = LicenseElement.refract({
            name: 'Apache 2.0',
            'x-internal-id': 'license-123',
          });

          expect(sexprs(licenseElement)).toMatchSnapshot();
        });

        specify('should mark x- extensions with specification-extension class', function () {
          const licenseElement = LicenseElement.refract({
            name: 'Apache 2.0',
            'x-internal-id': 'license-123',
          }) as ObjectElement;

          const extensionMember = licenseElement.getMember('x-internal-id');
          expect(includesClasses(['specification-extension'], extensionMember)).to.be.true;
        });
      });
    });
  });
});
