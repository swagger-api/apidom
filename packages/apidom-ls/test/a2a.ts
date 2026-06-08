import fs from 'node:fs';
import path from 'node:path';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver-types';
import { fileURLToPath } from 'node:url';

import getLanguageService from '../src/apidom-language-service.ts';
import {
  LanguageService,
  LanguageServiceContext,
  ValidationContext,
} from '../src/apidom-language-types.ts';
import { metadata } from './metadata.ts';
import { logPerformance, logLevel } from './test-utils.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const agentCardValid = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'a2a', 'agent-card-valid.json'))
  .toString();

const agentCardMissingRequired = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'a2a', 'agent-card-missing-required.json'))
  .toString();

const agentCardOAuthValid = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'a2a', 'agent-card-oauth-valid.json'))
  .toString();

const agentCardOAuthMissingScopes = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'a2a', 'agent-card-oauth-missing-scopes.json'))
  .toString();

const agentCardClientCredentialsMissingScopes = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'a2a',
      'agent-card-client-credentials-missing-scopes.json',
    ),
  )
  .toString();

const agentCardDeviceCodeMissingScopes = fs
  .readFileSync(
    path.join(__dirname, 'fixtures', 'a2a', 'agent-card-device-code-missing-scopes.json'),
  )
  .toString();

describe('apidom-ls-a2a', function () {
  const context: LanguageServiceContext = {
    metadata: metadata(),
    performanceLogs: logPerformance,
    logLevel,
    // A2A AgentCard documents carry no version discriminator field, so the
    // spec version used for lint-rule targeting is pinned to A2A v1.
    defaultContentLanguage: {
      namespace: 'a2a',
      version: '1.0.1',
      format: 'JSON',
      mediaType: 'application/vnd.a2a+json;version=1.0.1',
    },
  };

  const languageService: LanguageService = getLanguageService(context);

  after(function () {
    languageService.terminate();
  });

  it('validates a well-formed AgentCard with no diagnostics', async function () {
    this.timeout(10000);

    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/agent-card.json',
      'json',
      0,
      agentCardValid,
    );

    const result = await languageService.doValidation(doc, validationContext);
    assert.deepEqual(result, [] as Diagnostic[]);
  });

  it('reports missing required fields on AgentCard and nested AgentSkill', async function () {
    this.timeout(10000);

    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/agent-card-missing.json',
      'json',
      0,
      agentCardMissingRequired,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 0, character: 0 }, end: { line: 1, character: 3 } },
        message: "should always have a 'description' field",
        severity: 1,
        code: 9011700,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'description' field",
              action: 'addChild',
              snippetYaml: "description: ''\n",
              snippetJson: '"description": "",\n',
            },
          ],
        },
      },
      {
        range: { start: { line: 0, character: 0 }, end: { line: 1, character: 3 } },
        message: "should always have a 'supportedInterfaces' field",
        severity: 1,
        code: 9011800,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'supportedInterfaces' field",
              action: 'addChild',
              snippetYaml: 'supportedInterfaces:\n  - \n',
              snippetJson: '"supportedInterfaces": [],\n',
            },
          ],
        },
      },
      {
        range: { start: { line: 0, character: 0 }, end: { line: 1, character: 3 } },
        message: "should always have a 'version' field",
        severity: 1,
        code: 9011900,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'version' field",
              action: 'addChild',
              snippetYaml: "version: ''\n",
              snippetJson: '"version": "",\n',
            },
          ],
        },
      },
      {
        range: { start: { line: 0, character: 0 }, end: { line: 1, character: 3 } },
        message: "should always have a 'defaultInputModes' field",
        severity: 1,
        code: 9012100,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'defaultInputModes' field",
              action: 'addChild',
              snippetYaml: 'defaultInputModes:\n  - \n',
              snippetJson: '"defaultInputModes": [],\n',
            },
          ],
        },
      },
      {
        range: { start: { line: 0, character: 0 }, end: { line: 1, character: 3 } },
        message: "should always have a 'defaultOutputModes' field",
        severity: 1,
        code: 9012200,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'defaultOutputModes' field",
              action: 'addChild',
              snippetYaml: 'defaultOutputModes:\n  - \n',
              snippetJson: '"defaultOutputModes": [],\n',
            },
          ],
        },
      },
      {
        range: { start: { line: 1, character: 10 }, end: { line: 1, character: 13 } },
        message: "'name' must be a string",
        severity: 1,
        code: 9010100,
        source: 'apilint',
      },
      {
        range: { start: { line: 6, character: 4 }, end: { line: 8, character: 5 } },
        message: "should always have an 'id' field",
        severity: 1,
        code: 9030900,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'id' field",
              action: 'addChild',
              snippetYaml: "id: ''\n",
              snippetJson: '"id": "",\n',
            },
          ],
        },
      },
      {
        range: { start: { line: 6, character: 4 }, end: { line: 8, character: 5 } },
        message: "should always have a 'name' field",
        severity: 1,
        code: 9031000,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'name' field",
              action: 'addChild',
              snippetYaml: "name: ''\n",
              snippetJson: '"name": "",\n',
            },
          ],
        },
      },
      {
        range: { start: { line: 6, character: 4 }, end: { line: 8, character: 5 } },
        message: "should always have a 'description' field",
        severity: 1,
        code: 9031100,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'description' field",
              action: 'addChild',
              snippetYaml: "description: ''\n",
              snippetJson: '"description": "",\n',
            },
          ],
        },
      },
      {
        range: { start: { line: 6, character: 4 }, end: { line: 8, character: 5 } },
        message: "should always have a 'tags' field",
        severity: 1,
        code: 9031200,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'tags' field",
              action: 'addChild',
              snippetYaml: 'tags:\n  - \n',
              snippetJson: '"tags": [],\n',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('validates an AgentCard with oauth2 authorization code flow and scopes with no diagnostics', async function () {
    this.timeout(10000);

    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const doc = TextDocument.create('foo://bar/oauth-valid.json', 'json', 0, agentCardOAuthValid);
    const result = await languageService.doValidation(doc, validationContext);
    assert.deepEqual(result, [] as Diagnostic[]);
  });

  it('reports missing scopes on AuthorizationCodeOAuthFlow', async function () {
    this.timeout(10000);

    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const doc = TextDocument.create(
      'foo://bar/oauth-missing-scopes.json',
      'json',
      0,
      agentCardOAuthMissingScopes,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 26, character: 10 }, end: { line: 26, character: 29 } },
        message: "should always have a 'scopes' field",
        severity: 1,
        code: 9090800,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'scopes' field",
              action: 'addChild',
              snippetYaml: 'scopes: \n  \n',
              snippetJson: '"scopes": {\n  \n  },\n',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('reports missing scopes on ClientCredentialsOAuthFlow', async function () {
    this.timeout(10000);

    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const doc = TextDocument.create(
      'foo://bar/cc-missing-scopes.json',
      'json',
      0,
      agentCardClientCredentialsMissingScopes,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 26, character: 10 }, end: { line: 26, character: 29 } },
        message: "should always have a 'scopes' field",
        severity: 1,
        code: 9100500,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'scopes' field",
              action: 'addChild',
              snippetYaml: 'scopes: \n  \n',
              snippetJson: '"scopes": {\n  \n  },\n',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('reports missing scopes on DeviceCodeOAuthFlow', async function () {
    this.timeout(10000);

    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const doc = TextDocument.create(
      'foo://bar/dc-missing-scopes.json',
      'json',
      0,
      agentCardDeviceCodeMissingScopes,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 26, character: 10 }, end: { line: 26, character: 22 } },
        message: "should always have a 'scopes' field",
        severity: 1,
        code: 9110700,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'scopes' field",
              action: 'addChild',
              snippetYaml: 'scopes: \n  \n',
              snippetJson: '"scopes": {\n  \n  },\n',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected);
  });
});
