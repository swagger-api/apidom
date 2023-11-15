import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

import WorkflowsSpecElement from './WorkflowsSpec';
import InfoElement from './Info';

class WorkflowsSpecification1 extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'workflowsSpecification1';
    this.classes.push('api');
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
}

export default WorkflowsSpecification1;
