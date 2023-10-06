import { NamespacePluginOptions } from '@swagger-api/apidom-core';

import ContactElement from './elements/Contact';
import ExternalDocumentation from './elements/ExternalDocumentation';
import XmlElement from './elements/Xml';
import SecurityDefinitionsElement from './elements/SecurityDefinitions';
import SecuritySchemeElement from './elements/SecurityScheme';
import ScopesElement from './elements/Scopes';
import SecurityRequirementElement from './elements/SecurityRequirement';

const openApi2 = {
  namespace: (options: NamespacePluginOptions) => {
    const { base } = options;

    base.register('contact', ContactElement);
    base.register('externalDocumentation', ExternalDocumentation);
    base.register('xml', XmlElement);
    base.register('securityDefinitions', SecurityDefinitionsElement);
    base.register('securityScheme', SecuritySchemeElement);
    base.register('scopes', ScopesElement);
    base.register('securityRequirement', SecurityRequirementElement);

    return base;
  },
};

export default openApi2;
