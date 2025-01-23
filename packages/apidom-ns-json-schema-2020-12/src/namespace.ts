import { NamespacePluginOptions } from '@swagger-api/apidom-core';

import JSONSchemaElement from './elements/JSONSchema.ts';
import LinkDescriptionElement from './elements/LinkDescription.ts';

/**
 * @public
 */
const jsonSchema202012 = {
  namespace: (options: NamespacePluginOptions) => {
    const { base } = options;

    base.register('jSONSchema202012', JSONSchemaElement);
    base.register('linkDescription', LinkDescriptionElement);

    return base;
  },
};

export default jsonSchema202012;
