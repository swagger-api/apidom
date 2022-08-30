import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { ServerVariableElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('ServerVariableElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const serverVariableElement = ServerVariableElement.refract({
          enum: ['val1', 'val2'],
          default: 'val1',
          description: 'server-variable-description',
        });

        expect(sexprs(serverVariableElement)).toMatchSnapshot();
      });
    });
  });
});
