import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { MutualTlsSecuritySchemeElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('MutualTlsSecuritySchemeElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const element = MutualTlsSecuritySchemeElement.refract({
          description: 'Client cert required',
        });

        expect(sexprs(element)).toMatchSnapshot();
      });
    });
  });
});
