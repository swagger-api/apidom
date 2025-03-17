import { NamespacePluginOptions } from '@swagger-api/apidom-core';
import { JSONSchemaElement } from '@swagger-api/apidom-ns-json-schema-2020-12';

import ArazzoSpecification1Element from './elements/ArazzoSpecification1.ts';
import ArazzoSpecElement from './elements/ArazzoSpec.ts';
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

/**
 * @public
 */
const arazzo1 = {
  namespace: (options: NamespacePluginOptions) => {
    const { base } = options;

    base.register('arazzoSpecification1', ArazzoSpecification1Element);
    base.register('arazzoSpec', ArazzoSpecElement);
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
    base.register('jSONSchema202012', JSONSchemaElement);

    return base;
  },
};

export default arazzo1;
