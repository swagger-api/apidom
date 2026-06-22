import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { AgentCardElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('AgentCardElement', function () {
      specify('should refract a minimal agent card', function () {
        const element = AgentCardElement.refract({
          name: 'Demo Agent',
          description: 'A demo A2A agent',
          version: '1.0.0',
          iconUrl: 'https://demo.example/icon.png',
          documentationUrl: 'https://demo.example/docs',
          provider: {
            organization: 'Demo Inc',
            url: 'https://demo.example',
          },
          capabilities: {
            streaming: true,
            pushNotifications: false,
          },
          defaultInputModes: ['text/plain'],
          defaultOutputModes: ['application/json'],
          supportedInterfaces: [
            {
              url: 'https://demo.example/a2a',
              protocolBinding: 'JSONRPC',
              protocolVersion: '1.0',
            },
          ],
          skills: [
            {
              id: 'lookup',
              name: 'Lookup',
              description: 'Looks up data',
              tags: ['search'],
            },
          ],
        });

        expect(sexprs(element)).toMatchSnapshot();
      });

      specify('should refract an agent card with security schemes and a signature', function () {
        const element = AgentCardElement.refract({
          name: 'Secure Agent',
          version: '1.0.0',
          capabilities: {},
          defaultInputModes: [],
          defaultOutputModes: [],
          skills: [],
          securitySchemes: {
            apiKeyAuth: {
              apiKeySecurityScheme: {
                name: 'X-API-Key',
                location: 'header',
              },
            },
          },
          securityRequirements: [{ schemes: { apiKeyAuth: { list: [] } } }],
          signatures: [
            {
              protected: 'eyJhbGciOiJFUzI1NiJ9',
              signature: 'base64url-sig',
              header: { kid: 'key-1' },
            },
          ],
        });

        expect(sexprs(element)).toMatchSnapshot();
      });
    });
  });
});
