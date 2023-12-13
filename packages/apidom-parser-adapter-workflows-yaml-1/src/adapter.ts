import { propOr, omit } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { ParseResultElement, createNamespace } from '@swagger-api/apidom-core';
import {
  parse as parseYAML,
  detect as detectYAML,
} from '@swagger-api/apidom-parser-adapter-yaml-1-2';
import workflowsNamespace, {
  WorkflowsSpecification1Element,
} from '@swagger-api/apidom-ns-workflows-1';

export { default as mediaTypes } from './media-types';

export const detectionRegExp =
  /(?<YAML>^(["']?)workflowsSpec\2\s*:\s*(["']?)(?<version_yaml>1\.(?:[1-9]\d*|0)\.(?:[1-9]\d*|0))\3(?:\s+|$))|(?<JSON>"workflowsSpec"\s*:\s*"(?<version_json>1\.(?:[1-9]\d*|0)\.(?:[1-9]\d*|0))")/m;

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
    const workflowsSpecificationElement = WorkflowsSpecification1Element.refract(
      result,
      refractorOpts,
    );
    workflowsSpecificationElement.classes.push('result');
    parseResultElement.replaceResult(workflowsSpecificationElement);
  }

  return parseResultElement;
};

export const namespace = createNamespace(workflowsNamespace);
