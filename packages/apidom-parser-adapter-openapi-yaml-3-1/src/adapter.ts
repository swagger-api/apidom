import { propOr, omit } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { ParseResultElement, createNamespace } from '@swagger-api/apidom-core';
import {
  parse as parseYAML,
  detect as detectYAML,
} from '@swagger-api/apidom-parser-adapter-yaml-1-2';
import openApiNamespace, { OpenApi3_1Element } from '@swagger-api/apidom-ns-openapi-3-1';

export { default as mediaTypes } from './media-types';

export const detectionRegExp =
  /(?<YAML>^(["']?)openapi\2\s*:\s*(["']?)(?<version_yaml>3\.1\.(?:[1-9]\d*|0))\3(?:\s+|$))|(?<JSON>"openapi"\s*:\s*"(?<version_json>3\.1\.(?:[1-9]\d*|0))")/m;

export const detect = async (source: string): Promise<boolean> =>
  detectionRegExp.test(source) && (await detectYAML(source));

export const parse = async (
  source: string,
  options: Record<string, unknown> = {},
): Promise<ParseResultElement> => {
  const refractorOpts: Record<string, unknown> = propOr({}, 'refractorOpts', options);
  const parserOpts = omit(['refractorOpts'], options);
  const parseResultElement = await parseYAML(source, parserOpts);
  const { result } = parseResultElement;

  if (isNotUndefined(result)) {
    const openApiElement = OpenApi3_1Element.refract(result, refractorOpts);
    openApiElement.classes.push('result');
    parseResultElement.replaceResult(openApiElement);
  }

  return parseResultElement;
};

export const namespace = createNamespace(openApiNamespace);
