import { NamespacePluginOptions } from '@swagger-api/apidom-core';

import WorkflowsSpecification1Element from './elements/WorkflowsSpecification1';
import WorkflowsSpecElement from './elements/WorkflowsSpec';
import InfoElement from './elements/Info';

const workflows1 = {
  namespace: (options: NamespacePluginOptions) => {
    const { base } = options;

    base.register('workflowsSpecification1', WorkflowsSpecification1Element);
    base.register('workflowsSpec', WorkflowsSpecElement);
    base.register('info', InfoElement);

    return base;
  },
};

export default workflows1;
