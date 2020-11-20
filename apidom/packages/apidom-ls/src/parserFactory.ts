// @ts-ignore
import ApiDOMParser from 'apidom-parser';
// @ts-ignore
import * as openapi3_1Adapter from 'apidom-parser-adapter-openapi-json-3-1';
// @ts-ignore
import * as asyncapi2_0Adapter from 'apidom-parser-adapter-asyncapi-json-2-0';

// @ts-ignore
import { ParseResultElement } from 'apidom';

import { TextDocument } from 'vscode-languageserver-textdocument';

export interface Parser {
  parse(source: string, options: ParserOptions): PromiseLike<ParseResultElement>;
}

export interface ParserOptions {
  sourceMap?: boolean;
  specObj?: string;
  parser?: any;
}

export function isAsyncDoc(document: TextDocument | string): boolean {
  let text = '';
  if (typeof document === 'string') {
    text = document;
  } else {
    text = document.getText();
  }
  if (text.indexOf('asyncapi') > -1) {
    return true;
  }
  return false;
}

export function getParser(document: TextDocument): Parser {
  if (isAsyncDoc(document)) {
    return ApiDOMParser().use(asyncapi2_0Adapter);
  }
  return ApiDOMParser().use(openapi3_1Adapter);
}
