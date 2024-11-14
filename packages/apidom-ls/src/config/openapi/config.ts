import { DiagnosticSeverity } from 'vscode-languageserver-types';

import openapiMeta from './openapi/meta.ts';
import openapi3_0Meta from './openapi3_0/meta.ts';
import openapi3_1Meta from './openapi3_1/meta.ts';
import callbackMeta from './callback/meta.ts';
import componentsMeta from './components/meta.ts';
import contactMeta from './contact/meta.ts';
import contentMeta from './content/meta.ts';
import discriminatorMeta from './discriminator/meta.ts';
import definitionsMeta from './definitions/meta.ts';
import encodingMeta from './encoding/meta.ts';
import exampleMeta from './example/meta.ts';
import externalDocumentationMeta from './external-documentation/meta.ts';
import headerMeta from './header/meta.ts';
import headersMeta from './headers/meta.ts';
import infoMeta from './info/meta.ts';
import licenseMeta from './license/meta.ts';
import linkMeta from './link/meta.ts';
import referenceMeta from './reference/meta.ts';
import mediaTypeMeta from './media-type/meta.ts';
import oauthFlowMeta from './oauth-flow/meta.ts';
import oauthFlowsMeta from './oauth-flows/meta.ts';
import operationMeta from './operation/meta.ts';
import parameterMeta from './parameter/meta.ts';
import parametersDefinitionsMeta from './parameters-definitions/meta.ts';
import pathItemMeta from './path-item/meta.ts';
import pathsMeta from './paths/meta.ts';
import requestBodyMeta from './request-body/meta.ts';
import responseMeta from './response/meta.ts';
import responsesMeta from './responses/meta.ts';
import responsesDefinitionsMeta from './responses-definitions/meta.ts';
import securityRequirementMeta from './security-requirement/meta.ts';
import securitySchemeMeta from './security-scheme/meta.ts';
import securityDefinitionsMeta from './security-definitions/meta.ts';
import serverMeta from './server/meta.ts';
import serverVariableMeta from './server-variable/meta.ts';
import swaggerMeta from './swagger/meta.ts';
import tagMeta from './tag/meta.ts';
import xmlMeta from './xml/meta.ts';
import pathTemplateMeta from './path-template/meta.ts';
import itemsMeta from './items/meta.ts';
import scopesMeta from './scopes/meta.ts';
import schemaMeta from '../common/schema/meta.ts';
import ApilintCodes from '../codes.ts';

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
  securityDefinitions: securityDefinitionsMeta,
  server: serverMeta,
  serverVariable: serverVariableMeta,
  swagger: swaggerMeta,
  tag: tagMeta,
  xml: xmlMeta,
  items: itemsMeta,
  scopes: scopesMeta,
  schema: schemaMeta,
  'path-template': pathTemplateMeta,
};
