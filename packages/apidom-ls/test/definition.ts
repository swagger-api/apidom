import fs from 'node:fs';
import path from 'node:path';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { DefinitionParams } from 'vscode-languageserver-protocol';
import { Position, Range } from 'vscode-languageserver-types';
import { fileURLToPath } from 'node:url';

import getLanguageService from '../src/apidom-language-service';
import { LanguageService, LanguageServiceContext } from '../src/apidom-language-types';
import { logPerformance, logLevel } from './test-utils';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const specPath: string = path.join(__dirname, 'fixtures', 'deref/ext/root.json');
const spec = fs.readFileSync(specPath).toString();
const specPathYaml: string = path.join(__dirname, 'fixtures', 'deref/ext/root.yaml');
const specYaml = fs.readFileSync(specPathYaml).toString();

const defTestInput = [
  [
    'ref value',
    10,
    25,
    {
      end: {
        character: 3,
        line: 6,
      },
      start: {
        character: 23,
        line: 1,
      },
    },
  ],
];

const defTestInputYaml = [
  [
    'ref value',
    7,
    24,
    {
      end: {
        character: 3,
        line: 6,
      },
      start: {
        character: 23,
        line: 1,
      },
    },
  ],
];

describe('apidom-ls-definition', function () {
  const context: LanguageServiceContext = {
    performanceLogs: logPerformance,
    logLevel,
  };

  const languageService: LanguageService = getLanguageService(context);

  // eslint-disable-next-line mocha/no-hooks-for-single-case
  after(function () {
    languageService.terminate();
  });

  it('test external ref go to definition', async function () {
    const doc: TextDocument = TextDocument.create(specPath, 'apidom', 0, spec);

    for (const input of defTestInput) {
      // eslint-disable-next-line no-console
      console.log(`testing def for ${input[0]}`);
      const pos = Position.create(input[1] as number, input[2] as number);
      const definitionParams: DefinitionParams = {
        position: pos,
        textDocument: doc,
      };
      // eslint-disable-next-line no-await-in-loop
      const result = await languageService.doProvideDefinition(doc, definitionParams);
      // eslint-disable-next-line no-console
      console.log('external def result', JSON.stringify(result, null, 2));
      assert.deepEqual(result!.range, input[3] as Range);
      assert.isTrue(result!.uri!.endsWith('ex.json'));
    }
  });

  it('test external ref go to definition YAML->JSON', async function () {
    const doc: TextDocument = TextDocument.create(specPathYaml, 'apidom', 0, specYaml);

    for (const input of defTestInputYaml) {
      // eslint-disable-next-line no-console
      console.log(`testing YAML def for ${input[0]}`);
      const pos = Position.create(input[1] as number, input[2] as number);
      const definitionParams: DefinitionParams = {
        position: pos,
        textDocument: doc,
      };
      // eslint-disable-next-line no-await-in-loop
      const result = await languageService.doProvideDefinition(doc, definitionParams);
      // eslint-disable-next-line no-console
      console.log('external def result', JSON.stringify(result, null, 2));
      assert.deepEqual(result!.range, input[3] as Range);
      assert.isTrue(result!.uri!.endsWith('ex.json'));
    }
  });
});
