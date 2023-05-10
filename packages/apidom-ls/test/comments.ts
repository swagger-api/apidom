import fs from 'node:fs';
import path from 'node:path';
// import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Position, Range } from 'vscode-languageserver-types';

import getLanguageService from '../src/apidom-language-service';
import { LanguageService, LanguageServiceContext } from '../src/apidom-language-types';
import { logPerformance, logLevel } from './test-utils';

const specPathYaml: string = path.join(__dirname, 'fixtures', 'comments/comments.yaml');
const specYaml = fs.readFileSync(specPathYaml).toString();

const specPathYamlNew: string = path.join(__dirname, 'fixtures', 'comments/commentsChangeKey.yaml');
const specYamlNew = fs.readFileSync(specPathYamlNew).toString();

describe('apidom-ls-comments', function () {
  const context: LanguageServiceContext = {
    performanceLogs: logPerformance,
    logLevel,
  };

  const languageService: LanguageService = getLanguageService(context);

  // eslint-disable-next-line mocha/no-hooks-for-single-case
  after(function () {
    languageService.terminate();
  });

  // eslint-disable-next-line mocha/no-exclusive-tests
  it.only('test comments', async function () {
    const doc: TextDocument = TextDocument.create(specPathYaml, 'apidom', 0, specYaml);
    const docNew: TextDocument = TextDocument.create(specPathYamlNew, 'apidom', 0, specYamlNew);

    await languageService.testSync(doc, docNew);

    /*    for (const input of defTestInputYaml) {
      // eslint-disable-next-line no-console
      console.log(`testing comments for ${input[0]}`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const pos = Position.create(input[1] as number, input[2] as number);
      // eslint-disable-next-line no-await-in-loop
      await languageService.testSync(doc, docNew);
      // assert.deepEqual(result!.range, input[3] as Range);
      // @ts-ignore
      // const val = result!.contents!.value as string;
      // assert.isTrue(val.includes('externalParameter'));
    } */
  });
});
