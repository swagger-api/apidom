import { DiagnosticSeverity } from 'vscode-languageserver-types';

import openapiMeta from './openapi/meta';
import openapi3_0Meta from './openapi3_0/meta';
import openapi3_1Meta from './openapi3_1/meta';
import callbackMeta from './callback/meta';
import componentsMeta from './components/meta';
import contactMeta from './contact/meta';
import contentMeta from './content/meta';
import discriminatorMeta from './discriminator/meta';
import definitionsMeta from './definitions/meta';
import encodingMeta from './encoding/meta';
import exampleMeta from './example/meta';
import externalDocumentationMeta from './external-documentation/meta';
import headerMeta from './header/meta';
import headersMeta from './headers/meta';
import infoMeta from './info/meta';
import licenseMeta from './license/meta';
import linkMeta from './link/meta';
import referenceMeta from './reference/meta';
import mediaTypeMeta from './media-type/meta';
import oauthFlowMeta from './oauth-flow/meta';
import oauthFlowsMeta from './oauth-flows/meta';
import operationMeta from './operation/meta';
import parameterMeta from './parameter/meta';
import parametersDefinitionsMeta from './parameters-definitions/meta';
import pathItemMeta from './path-item/meta';
import pathsMeta from './paths/meta';
import requestBodyMeta from './request-body/meta';
import responseMeta from './response/meta';
import responsesMeta from './responses/meta';
import responsesDefinitionsMeta from './responses-definitions/meta';
import securityRequirementMeta from './security-requirement/meta';
import securitySchemeMeta from './security-scheme/meta';
import serverMeta from './server/meta';
import serverVariableMeta from './server-variable/meta';
import swaggerMeta from './swagger/meta';
import tagMeta from './tag/meta';
import xmlMeta from './xml/meta';
import pathTemplateMeta from './path-template/meta';
import itemsMeta from './items/meta';
import schemaMeta from '../common/schema/meta';
import ApilintCodes from '../codes';

export default {
  '*': {
    lint: [
      {
        code: ApilintCodes.DUPLICATE_KEYS,
        source: 'apilint',
        message: 'an object cannot contain duplicate keys',
        severity: DiagnosticSeverity.Error,
        linterFunction: 'apilintNoDuplicateKeys',
        marker: 'key',
      },
    ],
  },
  openapi: openapiMeta,
  openApi3_0: openapi3_0Meta,
  openApi3_1: openapi3_1Meta,
  callback: callbackMeta,
  components: componentsMeta,
  contact: contactMeta,
  content: contentMeta,
  discriminator: discriminatorMeta,
  definitions: definitionsMeta,
  encoding: encodingMeta,
  example: exampleMeta,
  externalDocumentation: externalDocumentationMeta,
  header: headerMeta,
  headers: headersMeta,
  info: infoMeta,
  license: licenseMeta,
  link: linkMeta,
  reference: referenceMeta,
  mediaType: mediaTypeMeta,
  oAuthFlow: oauthFlowMeta,
  oAuthFlows: oauthFlowsMeta,
  operation: operationMeta,
  parameter: parameterMeta,
  parametersDefinitions: parametersDefinitionsMeta,
  pathItem: pathItemMeta,
  paths: pathsMeta,
  requestBody: requestBodyMeta,
  response: responseMeta,
  responses: responsesMeta,
  responsesDefinitions: responsesDefinitionsMeta,
  securityRequirement: securityRequirementMeta,
  securityScheme: securitySchemeMeta,
  server: serverMeta,
  serverVariable: serverVariableMeta,
  swagger: swaggerMeta,
  tag: tagMeta,
  xml: xmlMeta,
  items: itemsMeta,
  schema: schemaMeta,
  'path-template': pathTemplateMeta,
};
