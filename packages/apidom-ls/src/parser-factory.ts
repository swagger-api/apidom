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
// @ts-ignore
import * as adsAdapter from '@swagger-api/apidom-ns-api-design-systems/adapters/json';
// @ts-ignore
import * as adsAdapter_Yaml from '@swagger-api/apidom-ns-api-design-systems/adapters/yaml';
// @ts-ignore
import { refractorPluginReplaceEmptyElement } from '@swagger-api/apidom-ns-asyncapi-2';
import { refractorPluginReplaceEmptyElement as refractorPluginReplaceEmptyElementOas } from '@swagger-api/apidom-ns-openapi-3-1';
/* import {
  refractPluginOpenApi3_1StandardIdentifierSelectors,
  refractPluginOpenApi3_1StandardIdentifierAccessors,
} from '@swagger-api/apidom-ns-api-design-systems'; */
import { TextDocument } from 'vscode-languageserver-textdocument';
import { ParseResultElement } from '@swagger-api/apidom-core';

import { isAsyncDoc, isAdsDoc, isJsonDoc, isSpecVersionSet, setMetadataMap } from './utils/utils';
import { MetadataMaps } from './apidom-language-types';

export interface ParserOptions {
  sourceMap?: boolean;
  specObj?: string;
  parser?: unknown;
}

export function getParser(document: TextDocument | string): ApiDOMParser {
  const async = isAsyncDoc(document);
  const ads = isAdsDoc(document);
  const json = isJsonDoc(document);

  if (ads && json) {
    return ApiDOMParser().use(adsAdapter);
  }
  if (ads && !json) {
    return ApiDOMParser().use(adsAdapter_Yaml);
  }
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
  return ApiDOMParser().use(asyncapi2Adapter);
}

export async function parse(
  textDocument: TextDocument | string,
  metadataMaps: MetadataMaps | undefined,
): Promise<ParseResultElement> {
  // TODO improve detection mechanism
  const text: string = typeof textDocument === 'string' ? textDocument : textDocument.getText();
  const async = isAsyncDoc(textDocument);
  const ads = isAdsDoc(textDocument);
  const versionSet = isSpecVersionSet(textDocument);
  const json = isJsonDoc(textDocument);
  let result;

  const options: Record<string, unknown> = {
    sourceMap: true,
  };

  if (ads && json) {
    result = await adsAdapter.parse(text, options);
  } else if (ads && !json) {
    result = await adsAdapter_Yaml.parse(text, options);
  } else if (async && json) {
    result = await asyncapi2Adapter.parse(text, options);
  } else if (async && !json) {
    options.refractorOpts = { plugins: [refractorPluginReplaceEmptyElement()] };
    result = await asyncapi2Adapter_Yaml.parse(text, options);
  } else if (!versionSet) {
    options.refractorOpts = { plugins: [refractorPluginReplaceEmptyElement()] };
    result = await asyncapi2Adapter_Yaml.parse(text, options);
  } else if (!async && json) {
    result = await openapi3_1Adapter.parse(text, options);
  } else if (!async && !json) {
    options.refractorOpts = { plugins: [refractorPluginReplaceEmptyElementOas()] };
    result = await openapi3_1Adapter_Yaml.parse(text, options);
  } else {
    // fallback
    result = await asyncapi2Adapter_Yaml.parse(text, {
      sourceMap: true,
      refractorOpts: { plugins: [refractorPluginReplaceEmptyElement()] },
    });
  }
  const { api } = result;
  if (api === undefined) return result;
  const docNs: string = isAdsDoc(text)
    ? 'ads'
    : isAsyncDoc(text) || !versionSet
    ? 'asyncapi'
    : 'openapi';
  // TODO  (francesco@tumanischvili@smartbear.com) use the type related metadata at root level defining the tokenTypes and modifiers
  setMetadataMap(api, docNs, metadataMaps); // TODO (francesco@tumanischvili@smartbear.com)  move to parser/adapter, extending the one standard
  api.freeze(); // !! freeze and add parent !!

  return result;
}
