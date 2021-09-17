import { expect } from 'chai';
import { sexprs } from 'apidom';

import { ServerVariableElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('ServerVariableElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const serverVariableElement = ServerVariableElement.refract({
          enum: ['val1', 'val2'],
          default: 'val1',
          description: 'server-variable-description',
          examples: ['val1', 'val2'],
        });

        expect(sexprs(serverVariableElement)).toMatchSnapshot();
      });
    });
  });
});
