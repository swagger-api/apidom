import { propOr, omit } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { ParseResultElement, createNamespace } from '@swagger-api/apidom-core';
import { parse as parseJSON, detect as detectJSON } from '@swagger-api/apidom-parser-adapter-json';
import a2aNamespace, { AgentCardElement } from '@swagger-api/apidom-ns-a2a-1';

export { default as mediaTypes } from './media-types.ts';

/**
 * A2A AgentCard documents do not contain a version discriminator field
 * (unlike `"openapi": "3.1.0"` or `"arazzo": "1.0.1"`). Detection is
 * therefore *structural*: a JSON document is treated as an A2A AgentCard
 * when it contains both a `capabilities` object and a `skills` array. These
 * two markers together are distinctive enough to discriminate AgentCard
 * documents from other JSON documents in practice. False positives are
 * possible; use the `mediaType` field on `File` to override when known.
 *
 * The exported `detectionRegExp` matches either marker individually (it
 * exists for parity with other adapters and is used as a cheap pre-filter).
 * The `detect` function performs the full AND check.
 *
 * @public
 */
export const detectionRegExp = /"capabilities"\s*:\s*\{|"skills"\s*:\s*\[/;

/**
 * @public
 */
export const detect = async (source: string): Promise<boolean> => {
  if (!(await detectJSON(source))) return false;
  const hasCapabilities = /"capabilities"\s*:\s*\{/.test(source);
  const hasSkills = /"skills"\s*:\s*\[/.test(source);
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
  const parseResultElement = await parseJSON(source, parserOpts);
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
