/**
 * Snake_case → camelCase canonicalisation for A2A documents.
 *
 * A2A's JSON encoding allows both camelCase and snake_case keys because the
 * spec is generated from protobuf, where the canonical form is snake_case
 * but protobuf's JSON encoding canonicalises to camelCase. Tooling on either
 * side of the conversion may emit either form.
 *
 * This module exposes a single function `canonicalizeKeys` that recursively
 * rewrites known snake_case keys to their camelCase equivalents. It is
 * applied to the raw input value *before* refraction, so the visitor pipeline
 * downstream only ever sees camelCase keys.
 *
 * Note: the mapping is global rather than element-scoped. This works because
 * every snake_case key listed below appears in only one logical position in
 * the schema (e.g. `default_input_modes` appears only inside AgentCard /
 * AgentSkill, never in unrelated contexts). If A2A ever introduces an
 * ambiguous snake_case key, this module will need a contextual variant.
 *
 * @public
 */

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
  // OAuth flow types (Authorization, ClientCredentials, DeviceCode, Implicit, Password)
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
 * Recursively rewrite known snake_case keys to camelCase in a plain JS value.
 * Pure: returns a new structure; the input is not mutated. No-op for keys
 * not in the mapping table.
 *
 * @public
 */
export const canonicalizeKeys = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(canonicalizeKeys);
  }
  if (value !== null && typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) {
      const canonicalKey = SNAKE_TO_CAMEL[key] ?? key;
      result[canonicalKey] = canonicalizeKeys(val);
    }
    return result;
  }
  return value;
};

export default canonicalizeKeys;
