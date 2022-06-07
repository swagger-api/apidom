import { propOr, omit } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { ParseResultElement, createNamespace } from '@swagger-api/apidom-core';
import {
  parse as parseYAML,
  detect as detectYAML,
} from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import '../../refractor/registration';
import MainElement from '../../elements/Main';
import apiDesignSystemsNamespace from '../../namespace';

export { default as mediaTypes } from './media-types';

export const detect = async (source: string): Promise<boolean> => {
  const isYAML = await detectYAML(source);

  return isYAML && /(["']?)version\1\s*:\s*(["']?)2021-05-07\2/g.test(source);
};

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

export const namespace = createNamespace(apiDesignSystemsNamespace);
