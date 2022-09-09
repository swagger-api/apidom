import { NamespacePluginOptions } from '@swagger-api/apidom-core';
import {
  SecurityRequirementElement,
  OAuthFlowElement,
  OAuthFlowsElement,
  SecuritySchemeElement,
  XmlElement,
  DiscriminatorElement,
  ExternalDocumentationElement,
  TagElement,
  ServerVariableElement,
  ServerElement,
  ContactElement,
  ExampleElement,
  LinkElement,
  EncodingElement,
  RequestBodyElement,
  PathsElement,
} from '@swagger-api/apidom-ns-openapi-3-0';

import CallbackElement from './elements/Callback';
import ComponentsElement from './elements/Components';
import HeaderElement from './elements/Header';
import InfoElement from './elements/Info';
import JsonSchemaDialectElement from './elements/JsonSchemaDialect';
import LicenseElement from './elements/License';
import MediaTypeElement from './elements/MediaType';
import OpenapiElement from './elements/Openapi';
import OpenApi3_1Element from './elements/OpenApi3-1';
import OperationElement from './elements/Operation';
import ParameterElement from './elements/Parameter';
import PathItemElement from './elements/PathItem';
import ReferenceElement from './elements/Reference';
import ResponseElement from './elements/Response';
import ResponsesElement from './elements/Responses';
import SchemaElement from './elements/Schema';

// eslint-disable-next-line @typescript-eslint/naming-convention
const openApi3_1 = {
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
    base.register('securityScheme', SecuritySchemeElement);
    base.register('server', ServerElement);
    base.register('serverVariable', ServerVariableElement);
    base.register('tag', TagElement);
    base.register('xml', XmlElement);

    return base;
  },
};

export default openApi3_1;
