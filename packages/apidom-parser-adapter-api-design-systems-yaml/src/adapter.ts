import { propOr, omit } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { ParseResultElement, createNamespace } from '@swagger-api/apidom-core';
import {
  parse as parseYAML,
  detect as detectYAML,
} from '@swagger-api/apidom-parser-adapter-yaml-1-2';
import apiDesignSystemsNamespace, { MainElement } from '@swagger-api/apidom-ns-api-design-systems';

export { default as mediaTypes } from './media-types.ts';

/**
 * @public
 */
export const detectionRegExp =
  /(?<YAML>^(["']?)version\2\s*:\s*(["']?)(?<version_yaml>2021-05-07)\3)|(?<JSON>"version"\s*:\s*"(?<version_json>2021-05-07)")/m;

/**
 * @public
 */
export const detect = async (source: string): Promise<boolean> =>
  detectionRegExp.test(source) && (await detectYAML(source));

/**
 * @public
 */
export const parse = async (
  source: string,
  options: Record<string, unknown> = {},
): Promise<ParseResultElement> => {
  const refractorOpts: Record<string, unknown> = propOr({}, 'refractorOpts', options);
  const parserOpts = omit(['refractorOpts'], options);
  const parseResultElement = await parseYAML(source, parserOpts);
  const { result } = parseResultElement;

  if (isNotUndefined(result)) {
    const mainElement = MainElement.refract(result, refractorOpts);
    mainElement.classes.push('result');
    parseResultElement.replaceResult(mainElement);
  }

  return parseResultElement;
};

/**
 * @public
 */
export const namespace = createNamespace(apiDesignSystemsNamespace);
