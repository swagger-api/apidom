import { NamespacePluginOptions } from '@swagger-api/apidom-core';

import WorkflowsSpecification1Element from './elements/WorkflowsSpecification1';
import WorkflowsSpecElement from './elements/WorkflowsSpec';
import InfoElement from './elements/Info';
import SourceDescriptionElement from './elements/SourceDescription';
import ParameterElement from './elements/Parameter';
import SuccessActionElement from './elements/SuccessAction';
import FailureActionElement from './elements/FailureAction';
import ComponentsElement from './elements/Components';
import CriterionElement from './elements/Criterion';
import ReferenceElement from './elements/Reference';
import JSONSchemaElement from './elements/JSONSchema';

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
    base.register('components', ComponentsElement);
    base.register('criterion', CriterionElement);
    base.register('reference', ReferenceElement);
    base.register('jSONSchemaDraft202012', JSONSchemaElement);

    return base;
  },
};

export default workflows1;
