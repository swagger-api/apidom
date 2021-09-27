// @ts-ignore
import ApiDOMParser from '@swagger-api/apidom-parser';
// @ts-ignore
import * as openapi3_1Adapter from '@swagger-api/apidom-parser-adapter-openapi-json-3-1';
// @ts-ignore
import * as asyncapi2Adapter from '@swagger-api/apidom-parser-adapter-asyncapi-json-2';
// @ts-ignore
import * as openapi3_1Adapter_Yaml from '@swagger-api/apidom-parser-adapter-openapi-yaml-3-1';
// @ts-ignore
import * as asyncapi2Adapter_Yaml from '@swagger-api/apidom-parser-adapter-asyncapi-yaml-2';
import { TextDocument } from 'vscode-languageserver-textdocument';

export interface ParserOptions {
  sourceMap?: boolean;
  specObj?: string;
  parser?: unknown;
}

export function getText(document: TextDocument | string, trim = false): string {
  let text = '';
  if (typeof document === 'string') {
    text = document;
  } else {
    text = document.getText();
  }
  if (trim) text = text.trim();
  return text;
}
export function isAsyncDoc(document: TextDocument | string): boolean {
  return getText(document).indexOf('asyncapi') > -1;
}

export interface RegexMap {
  [key: string]: RegExp;
}

export function isJsonDoc(document: TextDocument | string): boolean {
  const text = getText(document, true);
  const JSON_START = /^\[|^\{(?!\{)/;
  const JSON_ENDS: RegexMap = {
    '[': /]$/,
    '{': /}$/,
  };

  const jsonStart: RegExpMatchArray | null = text.match(JSON_START);
  return jsonStart != null && JSON_ENDS[jsonStart[0]].test(text);
}

export function getParser(document: TextDocument): ApiDOMParser {
  const async = isAsyncDoc(document);
  const json = isJsonDoc(document);
  if (async && json) {
    return ApiDOMParser().use(asyncapi2Adapter);
  }
  if (async && !json) {
    return ApiDOMParser().use(asyncapi2Adapter_Yaml);
  }
  if (!async && json) {
    return ApiDOMParser().use(openapi3_1Adapter);
  }
  if (!async && !json) {
    return ApiDOMParser().use(openapi3_1Adapter_Yaml);
  }
  return ApiDOMParser().use(openapi3_1Adapter);
}
