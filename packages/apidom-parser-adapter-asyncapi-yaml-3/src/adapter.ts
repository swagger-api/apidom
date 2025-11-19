import { omit, propOr } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { ParseResultElement, createNamespace } from '@swagger-api/apidom-core';
import {
  parse as parseYAML,
  detect as detectYAML,
} from '@swagger-api/apidom-parser-adapter-yaml-1-2';
import asyncApiNamespace, { AsyncApi3Element } from '@swagger-api/apidom-ns-asyncapi-3';

export { default as mediaTypes } from './media-types.ts';

/**
 * @public
 */
export const detectionRegExp =
  /(?<YAML>^(["']?)asyncapi\2\s*:\s*(["']?)(?<version_yaml>3\.(?:[1-9]\d*|0)\.(?:[1-9]\d*|0))\3(?:\s+|$))|(?<JSON>"asyncapi"\s*:\s*"(?<version_json>3\.(?:[1-9]\d*|0)\.(?:[1-9]\d*|0))")/m;

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
    const asyncApiElement = AsyncApi3Element.refract(result, refractorOpts);
    asyncApiElement.classes.push('result');
    parseResultElement.replaceResult(asyncApiElement);
  }

  return parseResultElement;
};

/**
 * @public
 */
export const namespace = createNamespace(asyncApiNamespace);
