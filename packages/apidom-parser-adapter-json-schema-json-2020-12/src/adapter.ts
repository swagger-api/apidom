import { propOr, omit } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { ParseResultElement, createNamespace } from '@swagger-api/apidom-core';
import { parse as parseJSON, detect as detectJSON } from '@swagger-api/apidom-parser-adapter-json';
import jsonSchemaNamespace, { JSONSchemaElement } from '@swagger-api/apidom-ns-json-schema-2020-12';

export { default as mediaTypes } from './media-types.ts';

/**
 * @public
 */
export const detectionRegExp =
  /"\$schema"\s*:\s*"https:\/\/json-schema\.org\/draft\/(?<version_json>2020-12)\/schema"/;

/**
 * @public
 */
export const detect = async (source: string): Promise<boolean> =>
  detectionRegExp.test(source) && (await detectJSON(source));

/**
 * @public
 */
export const parse = async (
  source: string,
  options: Record<string, unknown> = {},
): Promise<ParseResultElement> => {
  const refractorOpts: Record<string, unknown> = propOr({}, 'refractorOpts', options);
  const parserOpts = omit(['refractorOpts'], options);
  const parseResultElement = await parseJSON(source, parserOpts);
  const { result } = parseResultElement;

  if (isNotUndefined(result)) {
    const jsonSchemaElement = JSONSchemaElement.refract(result, refractorOpts);
    jsonSchemaElement.classes.push('result');
    parseResultElement.replaceResult(jsonSchemaElement);
  }

  return parseResultElement;
};

/**
 * @public
 */
export const namespace = createNamespace(jsonSchemaNamespace);
