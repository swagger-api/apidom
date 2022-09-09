import CallbackElement from '../elements/Callback';
import ComponentsElement from '../elements/Components';
import HeaderElement from '../elements/Header';
import InfoElement from '../elements/Info';
import JsonSchemaDialectElement from '../elements/JsonSchemaDialect';
import LicenseElement from '../elements/License';
import MediaTypeElement from '../elements/MediaType';
import OpenapiElement from '../elements/Openapi';
import OpenApi3_1Element from '../elements/OpenApi3-1';
import OperationElement from '../elements/Operation';
import ParameterElement from '../elements/Parameter';
import PathItemElement from '../elements/PathItem';
import ReferenceElement from '../elements/Reference';
import ResponseElement from '../elements/Response';
import ResponsesElement from '../elements/Responses';
import SchemaElement from '../elements/Schema';
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
ReferenceElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Reference',
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
