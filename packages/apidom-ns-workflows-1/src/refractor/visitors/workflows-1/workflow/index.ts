import stampit from 'stampit';
import { always } from 'ramda';

import WorkflowElement from '../../../../elements/Workflow';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const WorkflowVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Workflow']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new WorkflowElement();
  },
});

export default WorkflowVisitor;
