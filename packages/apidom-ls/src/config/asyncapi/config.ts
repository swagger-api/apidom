import asyncapi2Meta from './asyncapi2/meta';
import asyncapiVersionMeta from './async-api-version/meta';
import jsonSchemaMeta from '../common/schema/meta';
import securitySchemeMeta from './security-scheme/meta';
import infoMeta from './info/meta';
import contactMeta from './contact/meta';
import channelItemMeta from './channel-item/meta';
import channelBindingsMeta from './channel-bindings/meta';
import serversMeta from './servers/meta';
import externalDocsMeta from './external-documentation/meta';
import licenseMeta from './license/meta';
import serverMeta from './server/meta';
import securityRequirementMeta from './security-requirement/meta';
import serverVariableMeta from './server-variable/meta';
import channelsMeta from './channels/meta';
import parametersMeta from './parameters/meta';
import parameterMeta from './parameter/meta';
import operationMeta from './operation/meta';
import operationBindingsMeta from './operation-bindings/meta';
import operationTraitMeta from './operation-trait/meta';
import serverBindingsMeta from './server-bindings/meta';
import httpServerBindingMeta from './http-server-binding/meta';
import kafkaServerBindingMeta from './kafka-server-binding/meta';
import messageBindingsMeta from './message-bindings/meta';
import httpMessageBindingMeta from './http-message-binding/meta';
import kafkaMessageBindingMeta from './kafka-message-binding/meta';
import messageMeta from './message/meta';
import componentsMeta from './components/meta';
import ApilintCodes from '../codes';

/**
 * Keys in this object represents either element type names
 * or value of one of the meta classes.
 */

export default {
  '*': {
    lint: [
      {
        code: ApilintCodes.DUPLICATE_KEYS,
        source: 'apilint',
        message: 'an object cannot contain duplicate keys',
        severity: 1,
        linterFunction: 'apilintNoDuplicateKeys',
        marker: 'key',
      },
    ],
  },
  info: infoMeta,
  contact: contactMeta,
  license: licenseMeta,
  operation: operationMeta,
  operationBindings: operationBindingsMeta,
  operationTrait: operationTraitMeta,
  channelItem: channelItemMeta,
  channelBindings: channelBindingsMeta,
  channels: channelsMeta,
  asyncApi2: asyncapi2Meta,
  asyncApiVersion: asyncapiVersionMeta,
  parameters: parametersMeta,
  parameter: parameterMeta,
  // 'json-schema-type': jsonSchemaTypeMeta,
  schema: jsonSchemaMeta,
  securityScheme: securitySchemeMeta,
  securityRequirement: securityRequirementMeta,
  servers: serversMeta,
  server: serverMeta,
  serverVariable: serverVariableMeta,
  externalDocumentation: externalDocsMeta,
  serverBindings: serverBindingsMeta,
  httpServerBinding: httpServerBindingMeta,
  kafkaServerBinding: kafkaServerBindingMeta,
  messageBindings: messageBindingsMeta,
  httpMessageBinding: httpMessageBindingMeta,
  kafkaMessageBinding: kafkaMessageBindingMeta,
  message: messageMeta,
  components: componentsMeta,
};
