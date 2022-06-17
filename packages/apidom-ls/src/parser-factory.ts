// @ts-ignore
import * as openapi3_1Adapter from '@swagger-api/apidom-parser-adapter-openapi-json-3-1';
// @ts-ignore
import * as asyncapi2Adapter from '@swagger-api/apidom-parser-adapter-asyncapi-json-2';
// @ts-ignore
import * as openapi3_1Adapter_Yaml from '@swagger-api/apidom-parser-adapter-openapi-yaml-3-1';
// @ts-ignore
import * as asyncapi2Adapter_Yaml from '@swagger-api/apidom-parser-adapter-asyncapi-yaml-2';
// @ts-ignore
import * as adsAdapter from '@swagger-api/apidom-parser-adapter-api-design-systems-json';
// @ts-ignore
import * as adsAdapter_Yaml from '@swagger-api/apidom-parser-adapter-api-design-systems-yaml';
// @ts-ignore
import * as jsonParserAdapter from '@swagger-api/apidom-parser-adapter-json';
// @ts-ignore
import * as yamlParserAdapter from '@swagger-api/apidom-parser-adapter-yaml-1-2';
// @ts-ignore
import { refractorPluginReplaceEmptyElement } from '@swagger-api/apidom-ns-asyncapi-2';
import { refractorPluginReplaceEmptyElement as refractorPluginReplaceEmptyElementOas } from '@swagger-api/apidom-ns-openapi-3-1';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { ParseResultElement } from '@swagger-api/apidom-core';

import { setMetadataMap, findNamespace } from './utils/utils';
import { ContentLanguage, MetadataMaps } from './apidom-language-types';

export interface ParserOptions {
  sourceMap?: boolean;
  specObj?: string;
  parser?: unknown;
}

export async function parse(
  textDocument: TextDocument | string,
  metadataMaps: MetadataMaps | undefined,
  registerPlugins = true,
  freeze = true,
  setMetadata = true,
  defaultContentLanguage?: ContentLanguage,
): Promise<ParseResultElement> {
  // TODO improve detection mechanism
  const text: string = typeof textDocument === 'string' ? textDocument : textDocument.getText();
  let result;
  const contentLanguage = await findNamespace(text, defaultContentLanguage);
  if (contentLanguage.namespace === 'asyncapi' && contentLanguage.format === 'JSON') {
    result = await asyncapi2Adapter.parse(text, { sourceMap: true });
  } else if (contentLanguage.namespace === 'asyncapi' && contentLanguage.format === 'YAML') {
    const options: Record<string, unknown> = {
      sourceMap: true,
    };
    if (registerPlugins) {
      options.refractorOpts = { plugins: [refractorPluginReplaceEmptyElement()] };
    }
    result = await asyncapi2Adapter_Yaml.parse(text, options);
  } else if (contentLanguage.namespace === 'openapi' && contentLanguage.format === 'JSON') {
    result = await openapi3_1Adapter.parse(text, { sourceMap: true });
  } else if (contentLanguage.namespace === 'openapi' && contentLanguage.format === 'YAML') {
    const options: Record<string, unknown> = {
      sourceMap: true,
    };
    if (registerPlugins) {
      options.refractorOpts = { plugins: [refractorPluginReplaceEmptyElementOas()] };
    }
    result = await openapi3_1Adapter_Yaml.parse(text, options);
  } else if (contentLanguage.namespace === 'ads' && contentLanguage.format === 'JSON') {
    result = await adsAdapter.parse(text, { sourceMap: true });
  } else if (contentLanguage.namespace === 'ads' && contentLanguage.format === 'YAML') {
    result = await adsAdapter_Yaml.parse(text, { sourceMap: true });
  } else if (contentLanguage.namespace === 'apidom' && contentLanguage.format === 'JSON') {
    result = await jsonParserAdapter.parse(text, { sourceMap: true });
  } else if (contentLanguage.namespace === 'apidom' && contentLanguage.format === 'YAML') {
    result = await yamlParserAdapter.parse(text, { sourceMap: true });
  } else {
    // fallback
    result = await jsonParserAdapter.parse(text, { sourceMap: true });
  }
  const { api } = result;
  if (api === undefined) return result;
  const docNs = contentLanguage.namespace;
  // TODO  (francesco@tumanischvili@smartbear.com) use the type related metadata at root level defining the tokenTypes and modifiers
  if (setMetadata) {
    setMetadataMap(api, docNs, metadataMaps); // TODO (francesco@tumanischvili@smartbear.com)  move to parser/adapter, extending the one standard
  }
  if (freeze) {
    api.freeze(); // !! freeze and add parent !!
  }

  return result;
}
