// AsyncAPI 2.x specific tokens
const asyncAPI2Tokens = ['channelItem', 'securityRequirement', 'oAuthFlow', 'oAuthFlows'];

// AsyncAPI 3.x specific tokens
const asyncAPI3Tokens = [
  'channel',
  'messages',
  'operations',
  'operationReply',
  'operationReplyAddress',
  'multiFormatSchema',
  'components-operations',
  'components-replies',
  'components-reply-addresses',
  'components-tags',
  'components-external-documentation',
];

// Common tokens (present in both AsyncAPI 2 and AsyncAPI 3)
const commonTokens = [
  'parameter',
  'api-version',
  'spec-version',
  'info',
  'operation',
  'components',
  'components-parameters',
  'components-schemas',
  'components-channels',
  'components-security-schemes',
  'components-messages',
  'components-messageTraits',
  'components-operationTraits',
  'schema',
  'server',
  'servers',
  'server-variables',
  'channels',
  'reference-element',
  'reference-value',
  'channel-binding',
  'license',
  'message',
  'server-url',
  'asyncapi-reference',
  'json-reference',
  'parameters',
  'reference',
  'contact',
  'identifier',
  'defaultContentType',
  'tags',
  'externalDocumentation',
  'securityScheme',
  'discriminator',
  'messageTrait',
  'messageTraits',
  'operationTrait',
  'operationTraits',
  'security',
];

const tokens = [...asyncAPI2Tokens, ...asyncAPI3Tokens, ...commonTokens];

export default tokens;
