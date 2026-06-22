import { assert, expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { AgentCardElement, isAgentCardElement } from '../../src/index.ts';

describe('refractor', function () {
  context('snake_case canonicalisation', function () {
    specify('should refract snake_case keys identically to camelCase', function () {
      const camelCase = AgentCardElement.refract({
        name: 'Demo',
        url: 'https://demo.example',
        version: '1.0.0',
        iconUrl: 'https://demo.example/icon.png',
        documentationUrl: 'https://demo.example/docs',
        defaultInputModes: ['text/plain'],
        defaultOutputModes: ['application/json'],
        capabilities: {
          streaming: true,
          pushNotifications: false,
          extendedAgentCard: false,
        },
        supportedInterfaces: [
          { url: 'https://demo.example/grpc', protocolBinding: 'GRPC', protocolVersion: '1.0' },
        ],
        skills: [
          {
            id: 'skill-1',
            name: 'Skill 1',
            description: 'A skill',
            inputModes: ['text/plain'],
            outputModes: ['application/json'],
          },
        ],
      });

      const snakeCase = AgentCardElement.refract({
        name: 'Demo',
        url: 'https://demo.example',
        version: '1.0.0',
        icon_url: 'https://demo.example/icon.png',
        documentation_url: 'https://demo.example/docs',
        default_input_modes: ['text/plain'],
        default_output_modes: ['application/json'],
        capabilities: {
          streaming: true,
          push_notifications: false,
          extended_agent_card: false,
        },
        supported_interfaces: [
          { url: 'https://demo.example/grpc', protocol_binding: 'GRPC', protocol_version: '1.0' },
        ],
        skills: [
          {
            id: 'skill-1',
            name: 'Skill 1',
            description: 'A skill',
            input_modes: ['text/plain'],
            output_modes: ['application/json'],
          },
        ],
      });

      assert.isTrue(isAgentCardElement(camelCase));
      assert.isTrue(isAgentCardElement(snakeCase));
      // sexprs is structural; both should produce the same semantic tree
      expect(sexprs(snakeCase)).to.equal(sexprs(camelCase));
    });

    specify('should canonicalise security scheme oneof subfields', function () {
      const snake = AgentCardElement.refract({
        name: 'a',
        url: 'https://x',
        version: '1.0.0',
        capabilities: {},
        defaultInputModes: [],
        defaultOutputModes: [],
        skills: [],
        security_schemes: {
          apiKey: {
            api_key_security_scheme: { name: 'X-API-Key', location: 'header' },
          },
        },
      });
      const camel = AgentCardElement.refract({
        name: 'a',
        url: 'https://x',
        version: '1.0.0',
        capabilities: {},
        defaultInputModes: [],
        defaultOutputModes: [],
        skills: [],
        securitySchemes: {
          apiKey: {
            apiKeySecurityScheme: { name: 'X-API-Key', location: 'header' },
          },
        },
      });

      expect(sexprs(snake)).to.equal(sexprs(camel));
    });
  });
});
