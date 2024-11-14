import fs from 'node:fs';
import path from 'node:path';
import { TextDocument } from 'vscode-languageserver-textdocument';
// @ts-ignore
import { traverse, Element } from '@swagger-api/apidom-core';
import { fileURLToPath } from 'node:url';

import { parse } from '../src/parser-factory.ts';
import { getSourceMap, SourceMap } from '../src/utils/utils.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'async-info.yaml')).toString();

describe('apidom-ls-parse-partial', function () {
  it('test parse partial complete async', async function () {
    const doc: TextDocument = TextDocument.create('foo://bar/spec.json', 'yaml', 0, spec);

    parse(doc, undefined).then((result) => {
      const { api } = result;
      if (!api) {
        return;
      }
      api.freeze(); // !! freeze and add parent !!

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      function printSourceMap(node: Element): void {
        const sm: SourceMap = getSourceMap(node);
        // eslint-disable-next-line no-console
        console.log(node.element, `${sm.line}:${sm.column} - ${sm.endLine}:${sm.endColumn}`);
      }

      // traverse(printSourceMap, api);
      traverse(printSourceMap, api);
    });
  });
});
