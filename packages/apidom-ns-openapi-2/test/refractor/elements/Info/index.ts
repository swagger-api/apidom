import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { InfoElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('InfoElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const infoElement = InfoElement.refract({
          title: 'Sample Pet Store App',
          description: 'This is a sample server for a pet store.',
          termsOfService: 'https://example.com/terms/',
          contact: {},
          license: {},
          version: '1.0.1',
        });

        expect(sexprs(infoElement)).toMatchSnapshot();
      });
    });
  });
});
