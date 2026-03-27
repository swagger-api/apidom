import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { SolaceOperationBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('SolaceOperationBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const solaceOperationBindingElement = SolaceOperationBindingElement.refract({
          bindingVersion: '0.4.0',
          destinations: [{}],
          timeToLive: 1000,
          priority: 100,
          dmqEligible: true,
        });

        expect(sexprs(solaceOperationBindingElement)).toMatchSnapshot();
      });

      context('given timeToLive and priority fields of type SchemaElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const solaceOperationBindingElement = SolaceOperationBindingElement.refract({
            bindingVersion: '0.4.0',
            destinations: [{}],
            timeToLive: {},
            priority: {},
            dmqEligible: true,
          });

          expect(sexprs(solaceOperationBindingElement)).toMatchSnapshot();
        });
      });

      context('given timeToLive and priority fields of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const solaceOperationBindingElement = SolaceOperationBindingElement.refract({
            bindingVersion: '0.4.0',
            destinations: [{}],
            timeToLive: {
              $ref: '#/pointer',
            },
            priority: {
              $ref: '#/pointer',
            },
            dmqEligible: true,
          });

          expect(sexprs(solaceOperationBindingElement)).toMatchSnapshot();
        });
      });
    });
  });
});
