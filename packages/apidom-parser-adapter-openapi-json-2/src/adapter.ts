import { propOr, omit } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { ParseResultElement, createNamespace } from '@swagger-api/apidom-core';
import { parse as parseJSON, detect as detectJSON } from '@swagger-api/apidom-parser-adapter-json';
import openApiNamespace, { SwaggerElement } from '@swagger-api/apidom-ns-openapi-2';

export { default as mediaTypes } from './media-types';

export const detectionRegExp = /"swagger"\s*:\s*"(?<version_json>2\.0)"/;

export const detect = async (source: string): Promise<boolean> =>
  detectionRegExp.test(source) && (await detectJSON(source));

export const parse = async (
  source: string,
  options: Record<string, unknown> = {},
): Promise<ParseResultElement> => {
  const refractorOpts: Record<string, unknown> = propOr({}, 'refractorOpts', options);
  const parserOpts = omit(['refractorOpts'], options);
  const parseResultElement = await parseJSON(source, parserOpts);
  const { result } = parseResultElement;

  if (isNotUndefined(result)) {
    const swaggerElement = SwaggerElement.refract(result, refractorOpts);
    swaggerElement.classes.push('result');
    parseResultElement.replaceResult(swaggerElement);
  }

  return parseResultElement;
};

export const namespace = createNamespace(openApiNamespace);
