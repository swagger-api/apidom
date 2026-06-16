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

describe('apidom-ls-a2a', function () {
  const context: LanguageServiceContext = {
    metadata: metadata(),
    performanceLogs: logPerformance,
    logLevel,
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
});
