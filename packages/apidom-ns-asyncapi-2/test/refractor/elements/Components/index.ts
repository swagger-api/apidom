import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { ComponentsElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('ComponentsElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const componentsElement = ComponentsElement.refract({
          schemas: {
            User: {},
            UserRef: {
              $ref: '#/path/to/UserSchema',
            },
          },
          servers: {
            development: {},
            production: {
              $ref: '#/path/to/production/server',
            },
          },
          channels: {
            channel1: {},
          },
          messages: {
            Message: {},
            MessageRef: {
              $ref: '#/path/to/Message',
            },
          },
          securitySchemes: {
            SecurityScheme: {},
            SecuritySchemeRef: {
              $ref: '#/path/to/SecurityScheme',
            },
          },
          parameters: {
            Parameter: {},
            ParameterRef: {
              $ref: '#/path/to/Parameter',
            },
          },
          correlationIds: {
            CorrelationID: {},
            CorrelationIDRef: {
              $ref: '#/path/to/CorrelationID',
            },
          },
          operationTraits: {
            OperationTrait: {},
            OperationTraitRef: {
              $ref: '#/path/to/OperationTrait',
            },
          },
          messageTraits: {
            MessageTrait: {},
            MessageTraitRef: {
              $ref: '#/path/to/MessageTrait',
            },
          },
          serverBindings: {
            ServerBindings: {},
            ServerBindingsRef: {
              $ref: '#/path/to/ServerBindings',
            },
          },
          channelBindings: {
            ChannelBindings: {},
            ChannelBindingsRef: {
              $ref: '#/path/to/ChannelBindings',
            },
          },
          operationBindings: {
            OperationBindings: {},
            OperationBindingsRef: {
              $ref: '#/path/to/OperationBindings',
            },
          },
          messageBindings: {
            MessageBindings: {},
            MessageBindingsRef: {
              $ref: '#/path/to/MessageBindings',
            },
          },
        });

        expect(sexprs(componentsElement)).toMatchSnapshot();
      });
    });
  });
});
