import fs from 'node:fs';
import path from 'node:path';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver-types';

import getLanguageService from '../src/apidom-language-service';
import {
  LanguageService,
  LanguageServiceContext,
  ValidationContext,
} from '../src/apidom-language-types';
import { metadata } from './custom-metadata';
import { metadata as metadataJsonpath } from './custom-metadata-jsonpath';
import { logPerformance, logLevel } from './test-utils';

const specOpenapi = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'custom-rules-simple.yaml'))
  .toString();

const specOpenapiJsonpath = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'custom-rules-jsonpath.yaml'))
  .toString();

describe('apidom-ls-validate-custom-rules', function () {
  // const metadataNoTitle = JSON.parse(JSON.stringify(metadata()));
  // metadataNoTitle.metadataMaps.asyncapi.info.lint.splice(3, 1);

  it('test validation with custom rules', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const context: LanguageServiceContext = {
      metadata: metadata(),
      performanceLogs: logPerformance,
      logLevel,
    };

    // valid spec
    const docOpenapi: TextDocument = TextDocument.create(
      'foo://bar/openapi.yaml',
      'yaml',
      0,
      specOpenapi,
    );

    const languageService: LanguageService = getLanguageService(context);

    const result = await languageService.doValidation(docOpenapi, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 0, character: 0 },
          end: { line: 0, character: 5 },
        },
        message: "should always have a 'info' section",
        severity: 1,
        code: 7010101,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'info' section",
              action: 'addChild',
              snippetYaml: 'info: \n  \n',
              snippetJson: '"info": {\n  \n  },\n',
            },
          ],
        },
      },
      {
        range: {
          start: { line: 2, character: 2 },
          end: { line: 2, character: 28 },
        },
        message: 'path segments MUST follow kebab-case (lower case and separated with hyphens).',
        severity: 1,
        code: 20003,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 13, character: 8 },
          end: { line: 13, character: 17 },
        },
        message: 'properties MUST follow camelCase',
        severity: 1,
        code: 20001,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 18, character: 4 },
          end: { line: 18, character: 7 },
        },
        message: 'Parameter Object must contain one of the following fields: content, schema',
        severity: 1,
        code: 5150001,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'content' section",
              action: 'addChild',
              snippetYaml: 'content: \n  \n',
              snippetJson: '"content": {\n  \n  },\n',
            },
          ],
        },
      },
      {
        range: {
          start: { line: 20, character: 6 },
          end: { line: 20, character: 10 },
        },
        message: 'parameter names MUST follow camelCase',
        severity: 1,
        code: 20002,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 21, character: 4 },
          end: { line: 21, character: 8 },
        },
        message: 'Parameter Object must contain one of the following fields: content, schema',
        severity: 1,
        code: 5150001,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'content' section",
              action: 'addChild',
              snippetYaml: 'content: \n  \n',
              snippetJson: '"content": {\n  \n  },\n',
            },
          ],
        },
      },
      {
        range: {
          start: { line: 24, character: 4 },
          end: { line: 24, character: 7 },
        },
        message: 'Parameter Object must contain one of the following fields: content, schema',
        severity: 1,
        code: 5150001,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'content' section",
              action: 'addChild',
              snippetYaml: 'content: \n  \n',
              snippetJson: '"content": {\n  \n  },\n',
            },
          ],
        },
      },
    ];

    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('test validation with custom rules with JSON Path', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const contextJsonpath: LanguageServiceContext = {
      metadata: metadataJsonpath(),
      performanceLogs: logPerformance,
      logLevel,
    };

    // valid spec
    const docOpenapi: TextDocument = TextDocument.create(
      'foo://bar/openapi.yaml',
      'yaml',
      0,
      specOpenapiJsonpath,
    );

    const languageService: LanguageService = getLanguageService(contextJsonpath);

    const result = await languageService.doValidation(docOpenapi, validationContext);
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 23, character: 6 }, end: { line: 23, character: 10 } },
        message: 'parameter names MUST follow camelCase',
        severity: 1,
        code: 20002,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 32, character: 6 }, end: { line: 32, character: 10 } },
        message: 'parameter names MUST follow camelCase',
        severity: 1,
        code: 20002,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 16, character: 8 }, end: { line: 16, character: 17 } },
        message: 'keys MUST follow camelCase',
        severity: 1,
        code: 20001,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 31, character: 4 }, end: { line: 31, character: 7 } },
        message: 'keys MUST follow camelCase',
        severity: 1,
        code: 20001,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 3, character: 2 }, end: { line: 3, character: 7 } },
        message: 'title MUST follow camelCase',
        severity: 1,
        code: 20001,
        source: 'apilint',
        data: {},
      },
    ];

    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });
});
