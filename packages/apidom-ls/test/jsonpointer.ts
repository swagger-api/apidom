import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';

import getLanguageService from '../src/apidom-language-service';
import { LanguageService, LanguageServiceContext } from '../src/apidom-language-types';
import { metadata } from './metadata';
import { logPerformance, logLevel } from './test-utils';

const specAsyncYaml = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-async-validation-yaml.yaml'))
  .toString();

describe('apidom-ls-jsonpointer', function () {
  const context: LanguageServiceContext = {
    metadata: metadata(),
    performanceLogs: logPerformance,
    logLevel,
  };

  it('test json pointer', async function () {
    const docAsyncapiYaml: TextDocument = TextDocument.create(
      'foo://bar/specAsyncYaml.yaml',
      'yaml',
      0,
      specAsyncYaml,
    );

    const languageService: LanguageService = getLanguageService(context);

    const result = await languageService.getJsonPointerPosition(
      docAsyncapiYaml,
      '/components/schemas/Category/properties/id',
    );

    assert.deepEqual(result?.line, 69);

    languageService.terminate();
  });
});
