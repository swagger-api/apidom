import { propOr, omit } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { ParseResultElement, createNamespace } from '@swagger-api/apidom-core';
import { parse as parseJSON, detect as detectJSON } from '@swagger-api/apidom-parser-adapter-json';
import arazzoNamespace, { ArazzoSpecification1Element } from '@swagger-api/apidom-ns-arazzo-1';

export { default as mediaTypes } from './media-types.ts';

/**
 * @public
 */
export const detectionRegExp =
  /"arazzo"\s*:\s*"(?<version_json>1\.(?:[1-9]\d*|0)\.(?:[1-9]\d*|0))"/;

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
    const arazzoSpecificationElement = ArazzoSpecification1Element.refract(result, refractorOpts);
    arazzoSpecificationElement.classes.push('result');
    parseResultElement.replaceResult(arazzoSpecificationElement);
  }

  return parseResultElement;
};

/**
 * @public
 */
export const namespace = createNamespace(arazzoNamespace);
