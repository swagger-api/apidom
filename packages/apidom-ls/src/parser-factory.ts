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
import { ParseResultElement } from '@swagger-api/apidom-core';

import { setMetadataMap, MetadataMaps } from './utils/utils';

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

export async function parse(
  textDocument: TextDocument,
  metadataMaps: MetadataMaps | undefined,
): Promise<ParseResultElement> {
  const parser = getParser(textDocument);
  const text: string = textDocument.getText();
  const result = await parser.parse(text, { sourceMap: true });
  const { api } = result;
  if (api === undefined) return result;
  const docNs: string = isAsyncDoc(text) ? 'asyncapi' : 'openapi';
  // TODO  (francesco@tumanischvili@smartbear.com) use the type related metadata at root level defining the tokenTypes and modifiers
  setMetadataMap(api, docNs, metadataMaps); // TODO (francesco@tumanischvili@smartbear.com)  move to parser/adapter, extending the one standard
  api.freeze(); // !! freeze and add parent !!

  return result;
}
