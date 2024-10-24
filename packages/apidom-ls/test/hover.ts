import fs from 'node:fs';
import path from 'node:path';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Position, Range } from 'vscode-languageserver-types';
import { fileURLToPath } from 'node:url';

import getLanguageService from '../src/apidom-language-service';
import { LanguageService, LanguageServiceContext } from '../src/apidom-language-types';
import { logPerformance, logLevel } from './test-utils';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const specPathYaml: string = path.join(__dirname, 'fixtures', 'deref/hover/root.yaml');
const specYaml = fs.readFileSync(specPathYaml).toString();

const specPathInternalYaml: string = path.join(
  __dirname,
  'fixtures',
  'deref/hover/rootinternal.yaml',
);
const specInternalYaml = fs.readFileSync(specPathInternalYaml).toString();

const defTestInputYaml = [
  [
    'ref value',
    7,
    24,
    {
      end: {
        character: 42,
        line: 7,
      },
      start: {
        character: 12,
        line: 7,
      },
    },
  ],
];

const defTestInputInternalYaml = [
  [
    'ref value',
    14,
    36,
    {
      end: {
        character: 51,
        line: 14,
      },
      start: {
        character: 16,
        line: 14,
      },
    },
  ],
];

describe('apidom-ls-hover', function () {
  const context: LanguageServiceContext = {
    performanceLogs: logPerformance,
    logLevel,
  };

  const languageService: LanguageService = getLanguageService(context);

  // eslint-disable-next-line mocha/no-hooks-for-single-case
  after(function () {
    languageService.terminate();
  });

  it('test external ref hover', async function () {
    const doc: TextDocument = TextDocument.create(specPathYaml, 'apidom', 0, specYaml);

    for (const input of defTestInputYaml) {
      // eslint-disable-next-line no-console
      console.log(`testing hover for ${input[0]}`);
      const pos = Position.create(input[1] as number, input[2] as number);
      // eslint-disable-next-line no-await-in-loop
      const result = await languageService.doHover(doc, pos);
      assert.deepEqual(result!.range, input[3] as Range);
      // @ts-ignore
      const val = result!.contents!.value as string;
      assert.isTrue(val.includes('externalParameter'));
    }
  });

  it('test internal ref hover', async function () {
    const doc: TextDocument = TextDocument.create(
      specPathInternalYaml,
      'apidom',
      0,
      specInternalYaml,
    );

    for (const input of defTestInputInternalYaml) {
      // eslint-disable-next-line no-console
      console.log(`testing hover for ${input[0]}`);
      const pos = Position.create(input[1] as number, input[2] as number);
      // eslint-disable-next-line no-await-in-loop
      const result = await languageService.doHover(doc, pos);
      assert.deepEqual(result!.range, input[3] as Range);
      // @ts-ignore
      const val = result!.contents!.value as string;
      assert.isTrue(val.includes('ID of the user'));
    }
  });
});
