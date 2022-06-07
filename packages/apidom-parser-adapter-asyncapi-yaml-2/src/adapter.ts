import { omit, propOr } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { ParseResultElement, createNamespace } from '@swagger-api/apidom-core';
import { parse as parseYaml } from '@swagger-api/apidom-parser-adapter-yaml-1-2';
import asyncApiNamespace, { AsyncApi2Element } from '@swagger-api/apidom-ns-asyncapi-2';

export { default as mediaTypes } from './media-types';

export const detect = (source: string): boolean =>
  /(["']?)asyncapi\1\s*:\s*(["']?)((2\.0\.0)|(2\.1\.0)|(2\.2\.0)|(2\.3\.0)|(2\.4\.0))\2/g.test(
    source,
  );

export const parse = async (
  source: string,
  options: Record<string, unknown> = {},
): Promise<ParseResultElement> => {
  const refractorOpts: Record<string, unknown> = propOr({}, 'refractorOpts', options);
  const parserOpts = omit(['refractorOpts'], options);
  const parseResultElement = await parseYaml(source, parserOpts);
  const { result } = parseResultElement;

  if (isNotUndefined(result)) {
    const asyncApiElement = AsyncApi2Element.refract(result, refractorOpts);
    asyncApiElement.classes.push('result');
    parseResultElement.replaceResult(asyncApiElement);
  }

  return parseResultElement;
};

export const namespace = createNamespace(asyncApiNamespace);
