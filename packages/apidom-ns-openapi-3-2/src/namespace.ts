import { NamespacePluginOptions } from '@swagger-api/apidom-core';

import CallbackElement from './elements/Callback.ts';
import ComponentsElement from './elements/Components.ts';
import ContactElement from './elements/Contact.ts';
import DiscriminatorElement from './elements/Discriminator.ts';
import EncodingElement from './elements/Encoding.ts';
import ExampleElement from './elements/Example.ts';
import ExternalDocumentationElement from './elements/ExternalDocumentation.ts';
import HeaderElement from './elements/Header.ts';
import InfoElement from './elements/Info.ts';
import JsonSchemaDialectElement from './elements/JsonSchemaDialect.ts';
import LicenseElement from './elements/License.ts';
import LinkElement from './elements/Link.ts';
import MediaTypeElement from './elements/MediaType.ts';
import OAuthFlowElement from './elements/OAuthFlow.ts';
import OAuthFlowsElement from './elements/OAuthFlows.ts';
import OpenapiElement from './elements/Openapi.ts';
import OpenApi3_2Element from './elements/OpenApi3-2.ts';
import OperationElement from './elements/Operation.ts';
import ParameterElement from './elements/Parameter.ts';
import PathItemElement from './elements/PathItem.ts';
import PathsElement from './elements/Paths.ts';
import ReferenceElement from './elements/Reference.ts';
import RequestBodyElement from './elements/RequestBody.ts';
import ResponseElement from './elements/Response.ts';
import ResponsesElement from './elements/Responses.ts';
import SchemaElement from './elements/Schema.ts';
import SecurityRequirementElement from './elements/SecurityRequirement.ts';
import SecuritySchemeElement from './elements/SecurityScheme.ts';
import ServerElement from './elements/Server.ts';
import ServerVariableElement from './elements/ServerVariable.ts';
import TagElement from './elements/Tag.ts';
import XmlElement from './elements/Xml.ts';

/**
 * @public
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
const openApi3_2 = {
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
    base.register('jsonSchemaDialect', JsonSchemaDialectElement);
    base.register('license', LicenseElement);
    base.register('link', LinkElement);
    base.register('mediaType', MediaTypeElement);
    base.register('oAuthFlow', OAuthFlowElement);
    base.register('oAuthFlows', OAuthFlowsElement);
    base.register('openapi', OpenapiElement);
    base.register('openApi3_2', OpenApi3_2Element);
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

export default openApi3_2;
