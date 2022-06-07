import { propOr, omit } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { ParseResultElement, createNamespace } from '@swagger-api/apidom-core';
import { parse as parseJSON, detect as detectJSON } from '@swagger-api/apidom-parser-adapter-json';
import asyncApiNamespace, {
  AsyncApi2Element,
  mediaTypes,
  AsyncAPIMediaTypes,
} from '@swagger-api/apidom-ns-asyncapi-2';

const jsonMediaTypes = new AsyncAPIMediaTypes(
  ...mediaTypes.forFormat('generic'),
  ...mediaTypes.forFormat('json'),
);

export { jsonMediaTypes as mediaTypes };

export const detect = async (source: string): Promise<boolean> => {
  const isJson = await detectJSON(source);

  return (
    isJson &&
    !!source.match(/"asyncapi"\s*:\s*"((2\.0\.0)|(2\.1\.0)|(2\.2\.0)|(2\.3\.0)|(2\.4\.0))"/g)
  );
};

export const parse = async (
  source: string,
  options: Record<string, unknown> = {},
): Promise<ParseResultElement> => {
  const refractorOpts: Record<string, unknown> = propOr({}, 'refractorOpts', options);
  const parserOpts = omit(['refractorOpts'], options);
  const parseResultElement = await parseJSON(source, parserOpts);
  const { result } = parseResultElement;

  if (isNotUndefined(result)) {
    const asyncApiElement = AsyncApi2Element.refract(result, refractorOpts);
    asyncApiElement.classes.push('result');
    parseResultElement.replaceResult(asyncApiElement);
  }

  return parseResultElement;
};

export const namespace = createNamespace(asyncApiNamespace);
