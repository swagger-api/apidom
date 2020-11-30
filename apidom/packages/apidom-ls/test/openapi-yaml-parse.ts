import fs from 'fs';
import path from 'path';

import { TextDocument } from 'vscode-languageserver-textdocument';
import { Diagnostic, Position } from 'vscode-languageserver-types';
// @ts-ignore
import {
  Element,
  findAtOffset,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isMemberElement,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isObjectElement,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isStringElement,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  traverse,
} from 'apidom';
import { getParser } from '../src/parser-factory';
import { getSourceMap } from '../src/utils/utils';

// const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.yaml')).toString();
const specCompletion = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-completion.yaml'))
  .toString();
// const specCompletionJson = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api-completion.json')).toString();
// const specError = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api-error.yaml')).toString();

describe('apidom-parse-test', function () {
  it('test parse yaml', async function () {
    // valid spec
    const doc: TextDocument = TextDocument.create('foo://bar/file.yaml', 'yaml', 0, specCompletion);

    /*
    const doc: TextDocument = TextDocument.create(
      'foo://bar/file.yaml',
      'yaml',
      0,
      specCompletionJson,
    );
*/

    const parser = getParser(doc);
    const text: string = doc.getText();
    const diagnostics: Diagnostic[] = [];

    // eslint-disable-next-line consistent-return
    parser.parse(text, { sourceMap: true }).then((result) => {
      const { api } = result;
      if (!api) {
        return diagnostics;
      }
      api.freeze(); // !! freeze and add parent !!
      const pos = Position.create(2, 2); // yaml after the indent blank line
      // const pos = Position.create(3, 4); // json after the indent blank line
      // const pos = Position.create(1, 5); // yaml right after the colon
      // const pos = Position.create(2, 9); // json right after the colon

      /*
      function printSourceMap(node: Element): void {
        const sm: SourceMap = getSourceMap(node);
        console.log(node.element, `${sm.line}:${sm.column} - ${sm.endLine}:${sm.endColumn}`);
      }
      traverse(printSourceMap, api);
*/

      const offset = doc.offsetAt(pos);
      // find the current node
      const node: Element = findAtOffset({ offset, includeRightBound: true }, api);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const sm = getSourceMap(node as Element);

      /*      if (result.annotations) {
        for (const annotation of result.annotations) {
          console.log(annotation);
        }
      } */
    });
  });
});
