import callbackMeta from './callback/meta';
import contactMeta from './contact/meta';
import exampleMeta from './example/meta';
import externalDocumentationMeta from './external-documentation/meta';
import headerMeta from './header/meta';
import infoMeta from './info/meta';
import licenseMeta from './license/meta';
import linkMeta from './link/meta';
import oauthFlowMeta from './oauth-flow/meta';
import oauthFlowsMeta from './oauth-flows/meta';
import operationMeta from './operation/meta';
import parameterMeta from './parameter/meta';
import pathItemMeta from './path-item/meta';
import pathsMeta from './paths/meta';
import responseMeta from './response/meta';
import responsesMeta from './responses/meta';
import securityRequirementMeta from './security-requirement/meta';
import securitySchemeMeta from './security-scheme/meta';
import serverMeta from './server/meta';
import serverVariableMeta from './server-variable/meta';
import tagMeta from './tag/meta';
import openapi3_1Meta from './openapi3_1/meta';
import schemaMeta from '../common/schema/meta';
import ApilintCodes from '../codes';

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
  callback: callbackMeta,
  contact: contactMeta,
  example: exampleMeta,
  externalDocumentation: externalDocumentationMeta,
  header: headerMeta,
  info: infoMeta,
  license: licenseMeta,
  link: linkMeta,
  oAuthFlow: oauthFlowMeta,
  oAuthFlows: oauthFlowsMeta,
  operation: operationMeta,
  parameter: parameterMeta,
  parameters: parameterMeta,
  pathItem: pathItemMeta,
  paths: pathsMeta,
  response: responseMeta,
  responses: responsesMeta,
  securityRequirement: securityRequirementMeta,
  securityScheme: securitySchemeMeta,
  server: serverMeta,
  serverVariable: serverVariableMeta,
  tag: tagMeta,
  openApi3_1: openapi3_1Meta,
  schema: schemaMeta,
};
