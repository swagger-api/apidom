import { propOr, omit } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { ParseResultElement, createNamespace } from '@swagger-api/apidom-core';
import {
  parse as parseYAML,
  detect as detectYAML,
} from '@swagger-api/apidom-parser-adapter-yaml-1-2';
import a2aNamespace, { AgentCardElement } from '@swagger-api/apidom-ns-a2a-1';

export { default as mediaTypes } from './media-types.ts';

/**
 * A2A AgentCard documents do not contain a version discriminator field
 * (unlike `openapi: 3.1.0` or `arazzo: 1.0.1`). Detection is therefore
 * *structural*: a YAML or JSON document is treated as an A2A AgentCard when
 * it contains both a `capabilities` mapping and a `skills` sequence. These
 * two markers together are distinctive enough to discriminate AgentCard
 * documents from other YAML/JSON documents in practice. False positives are
 * possible; use the `mediaType` field on `File` to override when known.
 *
 * The exported `detectionRegExp` matches either marker individually (used as
 * a cheap pre-filter). The `detect` function performs the full AND check.
 *
 * @public
 */
export const detectionRegExp =
  /(?<YAML>^(["']?)(?:capabilities|skills)\2\s*:)|(?<JSON>"capabilities"\s*:\s*\{|"skills"\s*:\s*\[)/m;

/**
 * @public
 */
export const detect = async (source: string): Promise<boolean> => {
  if (!(await detectYAML(source))) return false;
  const hasCapabilities =
    /^(["']?)capabilities\1\s*:/m.test(source) || /"capabilities"\s*:\s*\{/.test(source);
  const hasSkills = /^(["']?)skills\1\s*:/m.test(source) || /"skills"\s*:\s*\[/.test(source);
  return hasCapabilities && hasSkills;
};

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
    const agentCardElement = AgentCardElement.refract(result, refractorOpts);
    agentCardElement.classes.push('result');
    parseResultElement.replaceResult(agentCardElement);
  }

  return parseResultElement;
};

/**
 * @public
 */
export const namespace = createNamespace(a2aNamespace);
