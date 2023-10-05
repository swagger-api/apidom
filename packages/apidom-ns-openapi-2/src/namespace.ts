import { NamespacePluginOptions } from '@swagger-api/apidom-core';

import SecuritySchemeElement from './elements/SecurityScheme';
import ScopesElement from './elements/ScopesElement';
import SecurityRequirementElement from './elements/SecurityRequirement';

const openApi2 = {
  namespace: (options: NamespacePluginOptions) => {
    const { base } = options;

    base.register('scopes', ScopesElement);
    base.register('securityRequirement', SecurityRequirementElement);
    base.register('securityScheme', SecuritySchemeElement);

    return base;
  },
};

export default openApi2;
