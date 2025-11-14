import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { OperationsElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('OperationsElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const operationsElement = OperationsElement.refract({
          onUserSignUp: {},
          onUserSignOut: {},
        });

        expect(sexprs(operationsElement)).toMatchSnapshot();
      });
    });

    context('given field is of type ReferenceElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const operationsElement = OperationsElement.refract({
          onUserSignUp: {},
          onUserSignOut: {
            $ref: '#/path/to/operation',
          },
        });

        expect(sexprs(operationsElement)).toMatchSnapshot();
      });
    });
  });
});
