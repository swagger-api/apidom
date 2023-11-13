import { NamespacePluginOptions } from '@swagger-api/apidom-core';

import WorkflowsSpecificationElement from './elements/WorkflowsSpecification';
import WorkflowsSpecElement from './elements/WorkflowsSpec';
import InfoElement from './elements/Info';

// eslint-disable-next-line @typescript-eslint/naming-convention
const workflowsSpecification = {
  namespace: (options: NamespacePluginOptions) => {
    const { base } = options;

    base.register('workflowsSpecification', WorkflowsSpecificationElement);
    base.register('workflowsSpec', WorkflowsSpecElement);
    base.register('info', InfoElement);

    return base;
  },
};

export default workflowsSpecification;
