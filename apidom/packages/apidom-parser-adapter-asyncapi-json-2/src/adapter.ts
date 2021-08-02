import { propOr, omit } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { ParseResultElement, createNamespace } from 'apidom';
// @ts-ignore
import { parse as parseJson } from 'apidom-parser-adapter-json';
import asyncApiNamespace, { AsyncApi2Element } from 'apidom-ns-asyncapi-2';

export const mediaTypes = [
  'application/vnd.aai.asyncapi;version=2.0.0',
  'application/vnd.aai.asyncapi+json;version=2.0.0',
];

export const detect = (source: string): boolean =>
  !!source.match(/(["']?)asyncapi\1\s*:\s*(["']?)2\.\d+\.\d+\2/g);

export const parse = async (
  source: string,
  options: Record<string, unknown> = {},
): Promise<ParseResultElement> => {
  const refractorOpts: Record<string, unknown> = propOr({}, 'refractorOpts', options);
  const parserOpts = omit(['refractorOpts'], options);
  const parseResultElement = await parseJson(source, parserOpts);
  const { result } = parseResultElement;

  if (isNotUndefined(result)) {
    const asyncApiElement = AsyncApi2Element.refract(result, refractorOpts);
    asyncApiElement.classes.push('result');
    parseResultElement.replaceResult(asyncApiElement);
  }

  return parseResultElement;
};

export const namespace = createNamespace(asyncApiNamespace);
