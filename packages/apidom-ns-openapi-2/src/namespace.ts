import { NamespacePluginOptions } from '@swagger-api/apidom-core';

import InfoElement from './elements/Info';
import LicenseElement from './elements/License';
import ContactElement from './elements/Contact';
import ExternalDocumentation from './elements/ExternalDocumentation';
import ParameterElement from './elements/Parameter';
import ItemsElement from './elements/Items';
import ExampleElement from './elements/Example';
import ResponseElement from './elements/Response';
import HeadersElement from './elements/Headers';
import HeaderElement from './elements/Header';
import TagElement from './elements/Tag';
import SchemaElement from './elements/Schema';
import XmlElement from './elements/Xml';
import ReferenceElement from './elements/Reference';
import DefinitionsElement from './elements/Definitions';
import ParametersDefinitionsElement from './elements/ParametersDefinitions';
import SecurityDefinitionsElement from './elements/SecurityDefinitions';
import SecuritySchemeElement from './elements/SecurityScheme';
import ScopesElement from './elements/Scopes';
import SecurityRequirementElement from './elements/SecurityRequirement';

const openApi2 = {
  namespace: (options: NamespacePluginOptions) => {
    const { base } = options;

    base.register('info', InfoElement);
    base.register('license', LicenseElement);
    base.register('contact', ContactElement);
    base.register('externalDocumentation', ExternalDocumentation);
    base.register('parameter', ParameterElement);
    base.register('items', ItemsElement);
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
    base.register('securityDefinitions', SecurityDefinitionsElement);
    base.register('securityScheme', SecuritySchemeElement);
    base.register('scopes', ScopesElement);
    base.register('securityRequirement', SecurityRequirementElement);

    return base;
  },
};

export default openApi2;
