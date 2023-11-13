import stampit from 'stampit';
import { always } from 'ramda';
import { ObjectElement } from '@swagger-api/apidom-core';

import FixedFieldsVisitor from '../generics/FixedFieldsVisitor';
import FallbackVisitor from '../FallbackVisitor';
import WorkflowsSpecificationElement from '../../../elements/WorkflowsSpecification';

// eslint-disable-next-line @typescript-eslint/naming-convention
const WorkflowsSpecificationVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'WorkflowsSpecification']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new WorkflowsSpecificationElement();
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      this.unrefractedElement = objectElement;

      // @ts-ignore
      return FixedFieldsVisitor.compose.methods.ObjectElement.call(this, objectElement);
    },
  },
});

export default WorkflowsSpecificationVisitor;
