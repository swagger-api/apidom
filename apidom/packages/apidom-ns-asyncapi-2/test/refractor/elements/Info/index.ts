import { expect } from 'chai';
import { sexprs } from 'apidom';

import { InfoElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('InfoElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const infoElement = InfoElement.refract({
          title: 'AsyncAPI Sample App',
          version: '1.0.1',
          description: 'This is a sample server.',
          termsOfService: 'http://asyncapi.org/terms/',
          contact: {
            name: 'API Support',
            url: 'http://www.asyncapi.org/support',
            email: 'support@asyncapi.org',
          },
          license: {
            name: 'Apache 2.0',
            url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
          },
        });

        expect(sexprs(infoElement)).toMatchSnapshot();
      });
    });
  });
});
