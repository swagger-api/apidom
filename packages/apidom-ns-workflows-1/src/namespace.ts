import { NamespacePluginOptions } from '@swagger-api/apidom-core';

import WorkflowsSpecification1Element from './elements/WorkflowsSpecification1';
import WorkflowsSpecElement from './elements/WorkflowsSpec';
import InfoElement from './elements/Info';
import SourceDescriptionElement from './elements/SourceDescription';
import ParameterElement from './elements/Parameter';
import SuccessActionElement from './elements/SuccessAction';
import FailureActionElement from './elements/FailureAction';
import CriterionElement from './elements/Criterion';

const workflows1 = {
  namespace: (options: NamespacePluginOptions) => {
    const { base } = options;

    base.register('workflowsSpecification1', WorkflowsSpecification1Element);
    base.register('workflowsSpec', WorkflowsSpecElement);
    base.register('info', InfoElement);
    base.register('sourceDescription', SourceDescriptionElement);
    base.register('parameter', ParameterElement);
    base.register('successAction', SuccessActionElement);
    base.register('failureAction', FailureActionElement);
    base.register('criterion', CriterionElement);

    return base;
  },
};

export default workflows1;
