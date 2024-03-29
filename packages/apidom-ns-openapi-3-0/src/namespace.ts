import { NamespacePluginOptions } from '@swagger-api/apidom-core';

import CallbackElement from './elements/Callback';
import ComponentsElement from './elements/Components';
import ContactElement from './elements/Contact';
import DiscriminatorElement from './elements/Discriminator';
import EncodingElement from './elements/Encoding';
import ExampleElement from './elements/Example';
import ExternalDocumentationElement from './elements/ExternalDocumentation';
import HeaderElement from './elements/Header';
import InfoElement from './elements/Info';
import LicenseElement from './elements/License';
import LinkElement from './elements/Link';
import MediaTypeElement from './elements/MediaType';
import OAuthFlowElement from './elements/OAuthFlow';
import OAuthFlowsElement from './elements/OAuthFlows';
import OpenapiElement from './elements/Openapi';
import OpenApi3_0Element from './elements/OpenApi3-0';
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
import SecuritySchemeElement from './elements/SecurityScheme';
import ServerElement from './elements/Server';
import ServerVariableElement from './elements/ServerVariable';
import TagElement from './elements/Tag';
import XmlElement from './elements/Xml';

// eslint-disable-next-line @typescript-eslint/naming-convention
const openApi3_0 = {
  namespace: (options: NamespacePluginOptions) => {
    const { base } = options;

    base.register('callback', CallbackElement);
    base.register('components', ComponentsElement);
    base.register('contact', ContactElement);
    base.register('discriminator', DiscriminatorElement);
    base.register('encoding', EncodingElement);
    base.register('example', ExampleElement);
    base.register('externalDocumentation', ExternalDocumentationElement);
    base.register('header', HeaderElement);
    base.register('info', InfoElement);
    base.register('license', LicenseElement);
    base.register('link', LinkElement);
    base.register('mediaType', MediaTypeElement);
    base.register('oAuthFlow', OAuthFlowElement);
    base.register('oAuthFlows', OAuthFlowsElement);
    base.register('openapi', OpenapiElement);
    base.register('openApi3_0', OpenApi3_0Element);
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
    base.register('securityScheme', SecuritySchemeElement);
    base.register('server', ServerElement);
    base.register('serverVariable', ServerVariableElement);
    base.register('tag', TagElement);
    base.register('xml', XmlElement);

    return base;
  },
};

export default openApi3_0;
