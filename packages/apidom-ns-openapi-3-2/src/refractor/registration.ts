import CallbackElement from '../elements/Callback.ts';
import ComponentsElement from '../elements/Components.ts';
import ContactElement from '../elements/Contact.ts';
import DiscriminatorElement from '../elements/Discriminator.ts';
import EncodingElement from '../elements/Encoding.ts';
import ExampleElement from '../elements/Example.ts';
import ExternalDocumentationElement from '../elements/ExternalDocumentation.ts';
import HeaderElement from '../elements/Header.ts';
import InfoElement from '../elements/Info.ts';
import JsonSchemaDialectElement from '../elements/JsonSchemaDialect.ts';
import LicenseElement from '../elements/License.ts';
import LinkElement from '../elements/Link.ts';
import MediaTypeElement from '../elements/MediaType.ts';
import OAuthFlowElement from '../elements/OAuthFlow.ts';
import OAuthFlowsElement from '../elements/OAuthFlows.ts';
import OpenapiElement from '../elements/Openapi.ts';
import OpenApi3_2Element from '../elements/OpenApi3-2.ts';
import OperationElement from '../elements/Operation.ts';
import ParameterElement from '../elements/Parameter.ts';
import PathItemElement from '../elements/PathItem.ts';
import PathsElement from '../elements/Paths.ts';
import ReferenceElement from '../elements/Reference.ts';
import RequestBodyElement from '../elements/RequestBody.ts';
import ResponseElement from '../elements/Response.ts';
import ResponsesElement from '../elements/Responses.ts';
import SchemaElement from '../elements/Schema.ts';
import SecurityRequirementElement from '../elements/SecurityRequirement.ts';
import SecuritySchemeElement from '../elements/SecurityScheme.ts';
import ServerElement from '../elements/Server.ts';
import ServerVariableElement from '../elements/ServerVariable.ts';
import TagElement from '../elements/Tag.ts';
import XmlElement from '../elements/Xml.ts';
import { createRefractor } from './index.ts';

// register refractors specific to element types
CallbackElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Callback',
  '$visitor',
]);
ComponentsElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Components',
  '$visitor',
]);
ContactElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Contact',
  '$visitor',
]);
ExampleElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Example',
  '$visitor',
]);
DiscriminatorElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Discriminator',
  '$visitor',
]);
EncodingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Encoding',
  '$visitor',
]);
ExternalDocumentationElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ExternalDocumentation',
  '$visitor',
]);
HeaderElement.refract = createRefractor(['visitors', 'document', 'objects', 'Header', '$visitor']);
InfoElement.refract = createRefractor(['visitors', 'document', 'objects', 'Info', '$visitor']);
JsonSchemaDialectElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'OpenApi',
  'fixedFields',
  'jsonSchemaDialect',
]);
LicenseElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'License',
  '$visitor',
]);
LinkElement.refract = createRefractor(['visitors', 'document', 'objects', 'Link', '$visitor']);
MediaTypeElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'MediaType',
  '$visitor',
]);
OAuthFlowElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'OAuthFlow',
  '$visitor',
]);
OAuthFlowsElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'OAuthFlows',
  '$visitor',
]);
OpenapiElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'OpenApi',
  'fixedFields',
  'openapi',
]);
OpenApi3_2Element.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'OpenApi',
  '$visitor',
]);
OperationElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Operation',
  '$visitor',
]);
ParameterElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Parameter',
  '$visitor',
]);
PathItemElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'PathItem',
  '$visitor',
]);
PathsElement.refract = createRefractor(['visitors', 'document', 'objects', 'Paths', '$visitor']);
ReferenceElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Reference',
  '$visitor',
]);
RequestBodyElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'RequestBody',
  '$visitor',
]);
ResponseElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Response',
  '$visitor',
]);
ResponsesElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Responses',
  '$visitor',
]);
SchemaElement.refract = createRefractor(['visitors', 'document', 'objects', 'Schema', '$visitor']);
SecurityRequirementElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'SecurityRequirement',
  '$visitor',
]);
SecuritySchemeElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'SecurityScheme',
  '$visitor',
]);
ServerElement.refract = createRefractor(['visitors', 'document', 'objects', 'Server', '$visitor']);
ServerVariableElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ServerVariable',
  '$visitor',
]);
TagElement.refract = createRefractor(['visitors', 'document', 'objects', 'Tag', '$visitor']);
XmlElement.refract = createRefractor(['visitors', 'document', 'objects', 'XML', '$visitor']);

export {
  CallbackElement,
  ComponentsElement,
  ContactElement,
  DiscriminatorElement,
  EncodingElement,
  ExampleElement,
  ExternalDocumentationElement,
  HeaderElement,
  InfoElement,
  JsonSchemaDialectElement,
  LicenseElement,
  LinkElement,
  MediaTypeElement,
  OAuthFlowElement,
  OAuthFlowsElement,
  OpenapiElement,
  OpenApi3_2Element,
  OperationElement,
  ParameterElement,
  PathItemElement,
  PathsElement,
  ReferenceElement,
  RequestBodyElement,
  ResponseElement,
  ResponsesElement,
  SchemaElement,
  SecurityRequirementElement,
  SecuritySchemeElement,
  ServerElement,
  ServerVariableElement,
  TagElement,
  XmlElement,
};
