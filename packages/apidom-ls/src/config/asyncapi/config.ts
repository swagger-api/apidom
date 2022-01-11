import asyncapi2Meta from './asyncapi2/meta';
import asyncapiVersionMeta from './asyncApiVersion/meta';
import jsonSchemaMeta from '../common/schema/meta';
import securitySchemeMeta from './securityscheme/meta';
import infoMeta from '../common/info/meta';
import contactMeta from '../common/contact/meta';
import channelMeta from './channel-item/meta';
import serversMeta from './servers/meta';
import externalDocsMeta from './external-documentation/meta';
import licenseMeta from '../common/license/meta';
import serverMeta from './server/meta';
import securityRequirementMeta from './securityrequirement/meta';
import serverVariableMeta from './server-variable/meta';
import channelsMeta from './channels/meta';
import parameterMeta from './parameter/meta';
import operationMeta from './operation/meta';
import operationTraitMeta from './operation-trait/meta';

export default {
  '*': {
    lint: [],
  },
  info: infoMeta,
  contact: contactMeta,
  license: licenseMeta,
  operation: operationMeta,
  operationTrait: operationTraitMeta,
  channelItem: channelMeta,
  channels: channelsMeta,
  asyncApi2: asyncapi2Meta,
  asyncApiVersion: asyncapiVersionMeta,
  parameter: parameterMeta,
  // 'json-schema-type': jsonSchemaTypeMeta,
  schema: jsonSchemaMeta,
  securityScheme: securitySchemeMeta,
  securityRequirement: securityRequirementMeta,
  servers: serversMeta,
  server: serverMeta,
  serverVariable: serverVariableMeta,
  externalDocumentation: externalDocsMeta,
};
