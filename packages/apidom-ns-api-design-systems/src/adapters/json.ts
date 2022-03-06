import { propOr, omit } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { ParseResultElement, createNamespace } from '@swagger-api/apidom-core';
import { parse as parseJson } from '@swagger-api/apidom-parser-adapter-json';

import '../refractor/registration';
import MainElement from '../elements/Main';
import mediaTypes, { ApiDesignSystemsMediaTypes } from '../media-types';
import apiDesignSystemsNamespace from '../namespace';

const jsonMediaTypes = new ApiDesignSystemsMediaTypes(
  ...mediaTypes.forFormat('generic'),
  ...mediaTypes.forFormat('json'),
);

export { jsonMediaTypes as mediaTypes };

export const detect = (source: string): boolean =>
  !!source.match(/(")version\1\s*:\s*(")2021-05-07\2/g);

export const parse = async (
  source: string,
  options: Record<string, unknown> = {},
): Promise<ParseResultElement> => {
  const refractorOpts: Record<string, unknown> = propOr({}, 'refractorOpts', options);
  const parserOpts = omit(['refractorOpts'], options);
  const parseResultElement = await parseJson(source, parserOpts);
  const { result } = parseResultElement;

  if (isNotUndefined(result)) {
    const mainElement = MainElement.refract(result, refractorOpts);
    mainElement.classes.push('result');
    parseResultElement.replaceResult(mainElement);
  }

  return parseResultElement;
};

export const namespace = createNamespace(apiDesignSystemsNamespace);
