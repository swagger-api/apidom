import { NamespacePluginOptions } from '@swagger-api/apidom-core';

import SecurityRequirementElement from './elements/SecurityRequirement';

const openApi2 = {
  namespace: (options: NamespacePluginOptions) => {
    const { base } = options;

    base.register('securityRequirement', SecurityRequirementElement);

    return base;
  },
};

export default openApi2;
