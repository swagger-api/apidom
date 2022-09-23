import openapi3_0Meta from './openapi3_0/meta';
import openapi3_1Meta from './openapi3_1/meta';
import callbackMeta from './callback/meta';
import componentsMeta from './components/meta';
import contactMeta from './contact/meta';
import discriminatorMeta from './discriminator/meta';
import encodingMeta from './encoding/meta';
import exampleMeta from './example/meta';
import externalDocumentationMeta from './external-documentation/meta';
import headerMeta from './header/meta';
import infoMeta from './info/meta';
import licenseMeta from './license/meta';
import linkMeta from './link/meta';
import mediaTypeMeta from './media-type/meta';
import oauthFlowMeta from './oauth-flow/meta';
import oauthFlowsMeta from './oauth-flows/meta';
import operationMeta from './operation/meta';
import parameterMeta from './parameter/meta';
import pathItemMeta from './path-item/meta';
import pathsMeta from './paths/meta';
import requestBodyMeta from './request-body/meta';
import responseMeta from './response/meta';
import responsesMeta from './responses/meta';
import securityRequirementMeta from './security-requirement/meta';
import securitySchemeMeta from './security-scheme/meta';
import serverMeta from './server/meta';
import serverVariableMeta from './server-variable/meta';
import tagMeta from './tag/meta';
import xmlMeta from './xml/meta';
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
  openApi3_0: openapi3_0Meta,
  openApi3_1: openapi3_1Meta,
  callback: callbackMeta,
  components: componentsMeta,
  contact: contactMeta,
  discriminator: discriminatorMeta,
  encoding: encodingMeta,
  example: exampleMeta,
  externalDocumentation: externalDocumentationMeta,
  header: headerMeta,
  info: infoMeta,
  license: licenseMeta,
  link: linkMeta,
  mediaType: mediaTypeMeta,
  oAuthFlow: oauthFlowMeta,
  oAuthFlows: oauthFlowsMeta,
  operation: operationMeta,
  parameter: parameterMeta,
  pathItem: pathItemMeta,
  paths: pathsMeta,
  requestBody: requestBodyMeta,
  response: responseMeta,
  responses: responsesMeta,
  securityRequirement: securityRequirementMeta,
  securityScheme: securitySchemeMeta,
  server: serverMeta,
  serverVariable: serverVariableMeta,
  tag: tagMeta,
  xml: xmlMeta,
  schema: schemaMeta,
};
