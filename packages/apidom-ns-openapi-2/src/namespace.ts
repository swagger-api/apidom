import { NamespacePluginOptions } from '@swagger-api/apidom-core';

import ScopesElement from './elements/ScopesElement';
import SecurityRequirementElement from './elements/SecurityRequirement';

const openApi2 = {
  namespace: (options: NamespacePluginOptions) => {
    const { base } = options;

    base.register('scopes', ScopesElement);
    base.register('securityRequirement', SecurityRequirementElement);

    return base;
  },
};

export default openApi2;
