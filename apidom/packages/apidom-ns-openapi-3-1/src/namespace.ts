import { NamespacePluginOptions } from 'minim';

import CallbackElement from './elements/Callback';
import ComponentsElement from './elements/Components';
import ContactElement from './elements/Contact';
import ExternalDocumentationElement from './elements/ExternalDocumentation';
import InfoElement from './elements/Info';
import LicenseElement from './elements/License';
import OpenapiElement from './elements/Openapi';
import OpenApi3_1Element from './elements/OpenApi3-1';
import OperationElement from './elements/Operation';
import ParameterElement from './elements/Parameter';
import PathItemElement from './elements/PathItem';
import PathsElement from './elements/Paths';
import ReferenceElement from './elements/Reference';
import RequestBodyElement from './elements/RequestBody';
import ResponseElement from './elements/Response';
import ResponsesElement from './elements/Responses';
import SchemaElement from './elements/Schema';
import SecurityRequirementElement from './elements/SecurityRequirement';
import ServerElement from './elements/Server';
import ServerVariableElement from './elements/ServerVariable';
import { createRefractor } from './refractor';

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
ExternalDocumentationElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ExternalDocumentation',
  '$visitor',
]);
InfoElement.refract = createRefractor(['visitors', 'document', 'objects', 'Info', '$visitor']);
LicenseElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'License',
  '$visitor',
]);
OpenapiElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'OpenApi',
  'fixedFields',
  'Openapi',
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
ServerElement.refract = createRefractor(['visitors', 'document', 'objects', 'Server', '$visitor']);
ServerVariableElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ServerVariable',
  '$visitor',
]);

const openApi3_1 = {
  namespace: (options: NamespacePluginOptions) => {
    const { base } = options;

    base.register('callback', CallbackElement);
    base.register('components', ComponentsElement);
    base.register('contact', ContactElement);
    base.register('externalDocumentation', ExternalDocumentationElement);
    base.register('info', InfoElement);
    base.register('license', LicenseElement);
    base.register('openapi', OpenapiElement);
    base.register('openApi3_1', OpenApi3_1Element);
    base.register('operation', OperationElement);
    base.register('parameter', ParameterElement);
    base.register('pathItem', PathItemElement);
    base.register('paths', PathsElement);
    base.register('reference', ReferenceElement);
    base.register('requestBody', RequestBodyElement);
    base.register('response', ResponseElement);
    base.register('responses', ResponsesElement);
    base.register('schema', SchemaElement);
    base.register('securityRequirement', SecurityRequirementElement);
    base.register('server', ServerElement);
    base.register('serverVariable', ServerVariableElement);

    base.register('response', Response);

    return base;
  },
};

export default openApi3_1;
