import CallbackElement from '../elements/Callback';
import ComponentsElement from '../elements/Components';
import ContactElement from '../elements/Contact';
import DiscriminatorElement from '../elements/Discriminator';
import EncodingElement from '../elements/Encoding';
import ExampleElement from '../elements/Example';
import ExternalDocumentationElement from '../elements/ExternalDocumentation';
import HeaderElement from '../elements/Header';
import InfoElement from '../elements/Info';
import JsonSchemaDialectElement from '../elements/JsonSchemaDialect';
import LicenseElement from '../elements/License';
import LinkElement from '../elements/Link';
import MediaTypeElement from '../elements/MediaType';
import OAuthFlowElement from '../elements/OAuthFlow';
import OAuthFlowsElement from '../elements/OAuthFlows';
import OpenapiElement from '../elements/Openapi';
import OpenApi3_1Element from '../elements/OpenApi3-1';
import OperationElement from '../elements/Operation';
import ParameterElement from '../elements/Parameter';
import PathItemElement from '../elements/PathItem';
import PathsElement from '../elements/Paths';
import ReferenceElement from '../elements/Reference';
import RequestBodyElement from '../elements/RequestBody';
import ResponseElement from '../elements/Response';
import ResponsesElement from '../elements/Responses';
import SchemaElement from '../elements/Schema';
import SecurityRequirementElement from '../elements/SecurityRequirement';
import SecuritySchemeElement from '../elements/SecurityScheme';
import ServerElement from '../elements/Server';
import ServerVariableElement from '../elements/ServerVariable';
import TagElement from '../elements/Tag';
import XmlElement from '../elements/Xml';
import { createRefractor } from './index';

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
OpenApi3_1Element.refract = createRefractor([
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
  OpenApi3_1Element,
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
