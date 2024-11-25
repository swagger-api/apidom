import { NamespacePluginOptions } from '@swagger-api/apidom-core';

import SwaggerElement from './elements/Swagger.ts';
import SwaggerVersionElement from './elements/SwaggerVersion.ts';
import InfoElement from './elements/Info.ts';
import ContactElement from './elements/Contact.ts';
import LicenseElement from './elements/License.ts';
import PathsElement from './elements/Paths.ts';
import PathItemElement from './elements/PathItem.ts';
import OperationElement from './elements/Operation.ts';
import ExternalDocumentation from './elements/ExternalDocumentation.ts';
import ParameterElement from './elements/Parameter.ts';
import ItemsElement from './elements/Items.ts';
import ExampleElement from './elements/Example.ts';
import ResponsesElement from './elements/Responses.ts';
import ResponseElement from './elements/Response.ts';
import HeadersElement from './elements/Headers.ts';
import HeaderElement from './elements/Header.ts';
import TagElement from './elements/Tag.ts';
import SchemaElement from './elements/Schema.ts';
import XmlElement from './elements/Xml.ts';
import ReferenceElement from './elements/Reference.ts';
import DefinitionsElement from './elements/Definitions.ts';
import ParametersDefinitionsElement from './elements/ParametersDefinitions.ts';
import ResponsesDefinitionsElement from './elements/ResponsesDefinitions.ts';
import SecurityDefinitionsElement from './elements/SecurityDefinitions.ts';
import SecuritySchemeElement from './elements/SecurityScheme.ts';
import ScopesElement from './elements/Scopes.ts';
import SecurityRequirementElement from './elements/SecurityRequirement.ts';

/**
 * @public
 */
const openApi2 = {
  namespace: (options: NamespacePluginOptions) => {
    const { base } = options;

    base.register('swagger', SwaggerElement);
    base.register('swaggerVersion', SwaggerVersionElement);
    base.register('info', InfoElement);
    base.register('contact', ContactElement);
    base.register('license', LicenseElement);
    base.register('paths', PathsElement);
    base.register('pathItem', PathItemElement);
    base.register('operation', OperationElement);
    base.register('externalDocumentation', ExternalDocumentation);
    base.register('parameter', ParameterElement);
    base.register('items', ItemsElement);
    base.register('responses', ResponsesElement);
    base.register('response', ResponseElement);
    base.register('headers', HeadersElement);
    base.register('example', ExampleElement);
    base.register('header', HeaderElement);
    base.register('tag', TagElement);
    base.register('reference', ReferenceElement);
    base.register('schema', SchemaElement);
    base.register('xml', XmlElement);
    base.register('definitions', DefinitionsElement);
    base.register('parametersDefinitions', ParametersDefinitionsElement);
    base.register('responsesDefinitions', ResponsesDefinitionsElement);
    base.register('securityDefinitions', SecurityDefinitionsElement);
    base.register('securityScheme', SecuritySchemeElement);
    base.register('scopes', ScopesElement);
    base.register('securityRequirement', SecurityRequirementElement);

    return base;
  },
};

export default openApi2;
