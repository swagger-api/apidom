/**
 * Snake_case → camelCase canonicalisation for A2A documents.
 *
 * A2A's JSON encoding allows both camelCase and snake_case keys because the
 * spec is generated from protobuf, where the canonical form is snake_case
 * but protobuf's JSON encoding canonicalises to camelCase. Tooling on either
 * side of the conversion may emit either form.
 *
 * This module exposes a single function `canonicalizeKeys` that recursively
 * rewrites known snake_case keys to their camelCase equivalents *on an ApiDOM
 * element tree*. It runs against the generic ApiDOM produced by `baseRefract`,
 * before the namespace visitor pipeline, so downstream visitors only ever see
 * camelCase keys.
 *
 * Operating on the element tree (rather than a plain JS value) is required
 * because documents reach the refractor through two paths: callers may pass a
 * plain JS value, but the parser adapters pass the already-refracted generic
 * Element from `parseJSON` / `parseYAML`. Both converge on a generic Element
 * after `baseRefract`, so canonicalising there covers every entry point.
 *
 * Note: the mapping is global rather than element-scoped. This works because
 * every snake_case key listed below appears in only one logical position in
 * the schema (e.g. `default_input_modes` appears only inside AgentCard /
 * AgentSkill, never in unrelated contexts). If A2A ever introduces an
 * ambiguous snake_case key, this module will need a contextual variant.
 *
 * @public
 */
import {
  Element,
  MemberElement,
  toValue,
  isElement,
  isObjectElement,
  isArrayElement,
  isStringElement,
} from '@swagger-api/apidom-core';

const SNAKE_TO_CAMEL: Record<string, string> = {
  // AgentCard
  default_input_modes: 'defaultInputModes',
  default_output_modes: 'defaultOutputModes',
  documentation_url: 'documentationUrl',
  icon_url: 'iconUrl',
  security_requirements: 'securityRequirements',
  security_schemes: 'securitySchemes',
  supported_interfaces: 'supportedInterfaces',
  // AgentCapabilities
  extended_agent_card: 'extendedAgentCard',
  push_notifications: 'pushNotifications',
  // AgentInterface
  protocol_binding: 'protocolBinding',
  protocol_version: 'protocolVersion',
  // AgentSkill
  input_modes: 'inputModes',
  output_modes: 'outputModes',
  // HTTPAuthSecurityScheme
  bearer_format: 'bearerFormat',
  // OAuth2SecurityScheme
  oauth2_metadata_url: 'oauth2MetadataUrl',
  // OpenIdConnectSecurityScheme
  open_id_connect_url: 'openIdConnectUrl',
  // OAuth flow types (Authorization, ClientCredentials, DeviceCode)
  authorization_url: 'authorizationUrl',
  token_url: 'tokenUrl',
  refresh_url: 'refreshUrl',
  device_authorization_url: 'deviceAuthorizationUrl',
  pkce_required: 'pkceRequired',
  // OAuthFlows wrapper
  authorization_code: 'authorizationCode',
  client_credentials: 'clientCredentials',
  device_code: 'deviceCode',
  // SecurityScheme wrapper (protobuf oneof subfields)
  api_key_security_scheme: 'apiKeySecurityScheme',
  http_auth_security_scheme: 'httpAuthSecurityScheme',
  mtls_security_scheme: 'mtlsSecurityScheme',
  oauth2_security_scheme: 'oauth2SecurityScheme',
  open_id_connect_security_scheme: 'openIdConnectSecurityScheme',
};

/**
 * Recursively rewrite known snake_case member keys to camelCase in an ApiDOM
 * element tree. Mutates `element` in place (the generic tree is freshly built
 * by `baseRefract`, so in-place rewriting is safe) and returns it. No-op for
 * keys not in the mapping table. Key `meta`/`attributes` (e.g. source maps)
 * are preserved because only the key's primitive content is rewritten.
 *
 * @public
 */
export const canonicalizeKeys = (element: Element): Element => {
  if (isObjectElement(element)) {
    (element.content as unknown as MemberElement[]).forEach((member) => {
      const { key, value } = member;
      if (isStringElement(key)) {
        const canonicalKey = SNAKE_TO_CAMEL[toValue(key) as string];
        if (typeof canonicalKey === 'string') {
          // minim's base typing declares `content` as `Array<unknown>`, but a
          // StringElement's content is the string primitive — assign through a
          // narrowed target so the rewrite type-checks.
          (key as unknown as { content: string }).content = canonicalKey;
        }
      }
      if (isElement(value)) {
        canonicalizeKeys(value);
      }
    });
  } else if (isArrayElement(element)) {
    (element.content as unknown as Element[]).forEach((item) => {
      canonicalizeKeys(item);
    });
  }
  return element;
};

export default canonicalizeKeys;
