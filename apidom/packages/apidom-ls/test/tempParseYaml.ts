import fs from 'fs';
import path from 'path';
import { assert } from 'chai';

import { TextDocument } from 'vscode-languageserver-textdocument';
import {
  CompletionList,
  Diagnostic,
  DiagnosticSeverity,
  Position,
  SymbolInformation,
} from 'vscode-languageserver-types';
// @ts-ignore
import {
  Element,
  findAtOffset,
  isMemberElement,
  isObjectElement,
  isStringElement,
  traverse,
} from 'apidom';
import { getParser } from '../src/parserFactory';
import getLanguageService from '../src/apidomLanguageService';
import {
  CompletionContext,
  LanguageService,
  LanguageServiceContext,
  ValidationContext,
} from '../src/apidomLanguageTypes';
import { getSourceMap, SourceMap } from '../src/utils/utils';

const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.yaml')).toString();
const specGood = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-good.yaml'))
  .toString();
const specCompletion = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-completion.yaml'))
  .toString();
const specCompletionJson = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-completion.json'))
  .toString();
const specError = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-error.yaml'))
  .toString();

describe('apidom-parse-test', function () {
  it('test parse yaml error', async function () {
    /*     const context: LanguageServiceContext = {};
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };
 */
    // valid spec
    // const doc: TextDocument = TextDocument.create('foo://bar/file.yaml', 'yaml', 0, specCompletion);
    const doc: TextDocument = TextDocument.create(
      'foo://bar/file.yaml',
      'yaml',
      0,
      specCompletionJson,
    );
    // const languageService: LanguageService = getLanguageService(context);

    // const result = await languageService.doValidation(doc, validationContext);

    const parser = getParser(doc);
    const text: string = doc.getText();
    const diagnostics: Diagnostic[] = [];

    return parser.parse(text, { sourceMap: true }).then((result) => {
      const { api } = result;
      // console.log('AAAA', JSON.stringify(result));
      // console.log('AAAA', JSON.stringify(result, null, 2).substring(0, 2000));
      if (!api) {
        return diagnostics;
      }
      api.freeze(); // !! freeze and add parent !!
      console.log('api', api.toValue());
      // const pos = Position.create(2, 2);
      const pos = Position.create(3, 4);
      // const pos = Position.create(4, 6);

      function t(node: Element): void {
        const sm: SourceMap = getSourceMap(node);
        console.log(node.element, `${sm.line}:${sm.column} - ${sm.endLine}:${sm.endColumn}`);
      }
      traverse(t, api);

      const offset = doc.offsetAt(pos);
      // find the current node
      console.log('offset', offset);
      const node = findAtOffset({ offset, includeRightBound: true }, api);
      const sm = getSourceMap(node);
      console.log('sm', sm);
      console.log('isObjectElement', isObjectElement(node));
      console.log('isMemberElement', isMemberElement(node));
      console.log('isStringElement', isStringElement(node));
      console.log('node', node.toValue());

      if (result.annotations) {
        for (const annotation of result.annotations) {
          // console.log(annotation);
        }
      }
    });
  });
});
