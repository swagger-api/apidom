import { ObjectElement, ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

import WorkflowsSpecElement from './WorkflowsSpec';
import InfoElement from './Info';
import ComponentsElement from './Components';

class WorkflowsSpecification1 extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'workflowsSpecification1';
    this.classes.push('api');
    this.classes.push('workflow');
  }

  get workflowsSpec(): WorkflowsSpecElement | undefined {
    return this.get('workflowsSpec');
  }

  set workflowsSpec(workflowsSpec: WorkflowsSpecElement | undefined) {
    this.set('workflowsSpec', workflowsSpec);
  }

  get info(): InfoElement | undefined {
    return this.get('info');
  }

  set info(info: InfoElement | undefined) {
    this.set('info', info);
  }

  get sourceDescriptions(): ArrayElement | undefined {
    return this.get('sourceDescriptions');
  }

  set sourceDescriptions(sourceDescriptions: ArrayElement | undefined) {
    this.set('sourceDescriptions', sourceDescriptions);
  }

  get workflows(): ArrayElement | undefined {
    return this.get('workflows');
  }

  set workflows(workflows: ArrayElement | undefined) {
    this.set('workflows', workflows);
  }

  get components(): ComponentsElement | undefined {
    return this.get('components');
  }

  set components(components: ComponentsElement | undefined) {
    this.set('components', components);
  }
}

export default WorkflowsSpecification1;
