import { NamespacePluginOptions } from 'minim';

import OpenApi3_1 from './elements/OpenApi3-1';
import Openapi from './elements/Openapi';
import Info from './elements/Info';
import License from './elements/License';
import Contact from './elements/Contact';
import Components from './elements/Components';
import Schema from './elements/Schema';
import Server from './elements/Server';
import ServerVariable from './elements/ServerVariable';
import Paths from './elements/Paths';
import PathItem from './elements/PathItem';
import Operation from './elements/Operation';
import Parameter from './elements/Parameter';
import Reference from './elements/Reference';
import ExternalDocumentation from './elements/ExternalDocumentation';
import RequestBody from './elements/RequestBody';
import Responses from './elements/Responses';
import Response from './elements/Response';
import Callback from './elements/Callback';
import SecurityRequirement from './elements/SecurityRequirement';
import { createRefractor } from './refractor';

// register refractors specific to element types
OpenApi3_1.refract = createRefractor(['visitors', 'document', 'objects', 'OpenApi', '$visitor']);
Openapi.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'OpenApi',
  'fixedFields',
  'Openapi',
]);
Info.refract = createRefractor(['visitors', 'document', 'objects', 'Info', '$visitor']);
License.refract = createRefractor(['visitors', 'document', 'objects', 'License', '$visitor']);
Contact.refract = createRefractor(['visitors', 'document', 'objects', 'Contact', '$visitor']);
Components.refract = createRefractor(['visitors', 'document', 'objects', 'Components', '$visitor']);
Schema.refract = createRefractor(['visitors', 'document', 'objects', 'Schema', '$visitor']);
Server.refract = createRefractor(['visitors', 'document', 'objects', 'Server', '$visitor']);
ServerVariable.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ServerVariable',
  '$visitor',
]);
Paths.refract = createRefractor(['visitors', 'document', 'objects', 'Paths', '$visitor']);
PathItem.refract = createRefractor(['visitors', 'document', 'objects', 'PathItem', '$visitor']);
Operation.refract = createRefractor(['visitors', 'document', 'objects', 'Operation', '$visitor']);
Parameter.refract = createRefractor(['visitors', 'document', 'objects', 'Parameter', '$visitor']);
Reference.refract = createRefractor(['visitors', 'document', 'objects', 'Reference', '$visitor']);
ExternalDocumentation.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ExternalDocumentation',
  '$visitor',
]);
RequestBody.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'RequestBody',
  '$visitor',
]);
Responses.refract = createRefractor(['visitors', 'document', 'objects', 'Responses', '$visitor']);
Response.refract = createRefractor(['visitors', 'document', 'objects', 'Response', '$visitor']);
Callback.refract = createRefractor(['visitors', 'document', 'objects', 'Callback', '$visitor']);
SecurityRequirement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'SecurityRequirement',
  '$visitor',
]);

const openApi3_1 = {
  namespace: (options: NamespacePluginOptions) => {
    const { base } = options;

    base.register('openApi3_1', OpenApi3_1);
    base.register('openapi', Openapi);
    base.register('info', Info);
    base.register('license', License);
    base.register('contact', Contact);
    base.register('components', Components);
    base.register('schema', Schema);
    base.register('server', Server);
    base.register('serverVariable', ServerVariable);
    base.register('paths', Paths);
    base.register('pathItem', PathItem);
    base.register('operation', Operation);
    base.register('parameter', Parameter);
    base.register('reference', Reference);
    base.register('externalDocumentation', ExternalDocumentation);
    base.register('requestBody', RequestBody);
    base.register('responses', Responses);
    base.register('callback', Callback);
    base.register('securityRequirement', SecurityRequirement);
    base.register('response', Response);

    return base;
  },
};

export default openApi3_1;
