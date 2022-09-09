import CallbackElement from '../elements/Callback';
import ComponentsElement from '../elements/Components';
import ContactElement from '../elements/Contact';
import EncodingElement from '../elements/Encoding';
import ExampleElement from '../elements/Example';
import HeaderElement from '../elements/Header';
import InfoElement from '../elements/Info';
import JsonSchemaDialectElement from '../elements/JsonSchemaDialect';
import LicenseElement from '../elements/License';
import LinkElement from '../elements/Link';
import MediaTypeElement from '../elements/MediaType';
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
import ServerElement from '../elements/Server';
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
EncodingElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Encoding',
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
ServerElement.refract = createRefractor(['visitors', 'document', 'objects', 'Server', '$visitor']);
