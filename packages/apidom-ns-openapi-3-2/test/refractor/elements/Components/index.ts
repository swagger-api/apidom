import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { ComponentsElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('ComponentsElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const componentsElement = ComponentsElement.refract({
          schemas: {
            Schema1: {},
          },
          responses: {
            Response1: {},
            Response2: { $ref: '#/components/responses/Response1' },
          },
          parameters: {
            Parameter1: {},
            Parameter2: { $ref: '#/components/parameters/Parameter1' },
          },
          examples: {
            Example1: {},
            Example2: { $ref: '#/components/examples/Example1' },
          },
          requestBodies: {
            RequestBody1: {},
            RequestBody2: { $ref: '#/components/requestBodies/RequestBody1' },
          },
          headers: {
            Header1: {},
            Header2: { $ref: '#/components/headers/Header1' },
          },
          securitySchemes: {
            SecurityScheme1: {},
            SecurityScheme2: { $ref: '#/components/securitySchemes/SecurityScheme1' },
          },
          links: {
            Link1: {},
            Link2: { $ref: '#/components/links/Link1' },
          },
          callbacks: {
            Callback1: {},
            Callback2: { $ref: '#/components/callbacks/Callback1' },
          },
          pathItems: {
            PathItem1: {},
            PathItem2: { $ref: '#/components/pathsItems/PathItem1' },
            PathItem3: {
              $ref: '#/components/pathsItems/PathItem1',
              get: {},
            },
          },
        });

        expect(sexprs(componentsElement)).toMatchSnapshot();
      });
    });
  });
});
