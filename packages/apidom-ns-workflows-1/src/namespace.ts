import { NamespacePluginOptions } from '@swagger-api/apidom-core';

import WorkflowsSpecification1Element from './elements/WorkflowsSpecification1.ts';
import WorkflowsSpecElement from './elements/WorkflowsSpec.ts';
import InfoElement from './elements/Info.ts';
import SourceDescriptionElement from './elements/SourceDescription.ts';
import WorkflowElement from './elements/Workflow.ts';
import StepElement from './elements/Step.ts';
import ParameterElement from './elements/Parameter.ts';
import SuccessActionElement from './elements/SuccessAction.ts';
import FailureActionElement from './elements/FailureAction.ts';
import ComponentsElement from './elements/Components.ts';
import CriterionElement from './elements/Criterion.ts';
import ReferenceElement from './elements/Reference.ts';
import JSONSchemaElement from './elements/JSONSchema.ts';

/**
 * @public
 */
const workflows1 = {
  namespace: (options: NamespacePluginOptions) => {
    const { base } = options;

    base.register('workflowsSpecification1', WorkflowsSpecification1Element);
    base.register('workflowsSpec', WorkflowsSpecElement);
    base.register('info', InfoElement);
    base.register('sourceDescription', SourceDescriptionElement);
    base.register('workflow', WorkflowElement);
    base.register('step', StepElement);
    base.register('parameter', ParameterElement);
    base.register('successAction', SuccessActionElement);
    base.register('failureAction', FailureActionElement);
    base.register('components', ComponentsElement);
    base.register('criterion', CriterionElement);
    base.register('reference', ReferenceElement);
    base.register('jSONSchemaDraft202012', JSONSchemaElement);

    return base;
  },
};

export default workflows1;
