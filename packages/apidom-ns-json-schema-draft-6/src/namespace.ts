import { NamespacePluginOptions } from '@swagger-api/apidom-core';
import { JSONReferenceElement, MediaElement } from '@swagger-api/apidom-ns-json-schema-draft-4';

import JSONSchemaElement from './elements/JSONSchema.ts';
import LinkDescriptionElement from './elements/LinkDescription.ts';

/**
 * @public
 */
const jsonSchemaDraft6 = {
  namespace: (options: NamespacePluginOptions) => {
    const { base } = options;

    base.register('jSONSchemaDraft6', JSONSchemaElement);
    base.register('jSONReference', JSONReferenceElement);
    base.register('media', MediaElement);
    base.register('linkDescription', LinkDescriptionElement);

    return base;
  },
};

export default jsonSchemaDraft6;
