import { NamespacePluginOptions } from '@swagger-api/apidom-core';

import InfoElement from './elements/Info';
import LicenseElement from './elements/License';
import ContactElement from './elements/Contact';
import ExternalDocumentation from './elements/ExternalDocumentation';
import ItemsElement from './elements/Items';
import ExampleElement from './elements/Example';
import HeaderElement from './elements/Header';
import TagElement from './elements/Tag';
import XmlElement from './elements/Xml';
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
    base.register('items', ItemsElement);
    base.register('example', ExampleElement);
    base.register('header', HeaderElement);
    base.register('tag', TagElement);
    base.register('xml', XmlElement);
    base.register('securityDefinitions', SecurityDefinitionsElement);
    base.register('securityScheme', SecuritySchemeElement);
    base.register('scopes', ScopesElement);
    base.register('securityRequirement', SecurityRequirementElement);

    return base;
  },
};

export default openApi2;
