import { propOr, omit } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { ParseResultElement, createNamespace } from '@swagger-api/apidom-core';
import { parse as parseJSON, detect as detectJSON } from '@swagger-api/apidom-parser-adapter-json';
import openApiNamespace, { OpenApi3_0Element } from '@swagger-api/apidom-ns-openapi-3-0';

export { default as mediaTypes } from './media-types.ts';

/**
 * @public
 */
export const detectionRegExp = /"openapi"\s*:\s*"(?<version_json>3\.0\.(?:[1-9]\d*|0))"/;

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
    const openApiElement = OpenApi3_0Element.refract(result, refractorOpts);
    openApiElement.classes.push('result');
    parseResultElement.replaceResult(openApiElement);
  }

  return parseResultElement;
};

/**
 * @public
 */
export const namespace = createNamespace(openApiNamespace);
