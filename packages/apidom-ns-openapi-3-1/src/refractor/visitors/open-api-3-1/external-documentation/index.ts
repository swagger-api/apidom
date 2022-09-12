import stampit from 'stampit';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-0';

import ExternalDocumentationElement from '../../../../elements/ExternalDocumentation';

const {
  visitors: {
    document: {
      objects: {
        ExternalDocumentation: { $visitor: BaseExternalDocumentationVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

const ExternalDocumentationVisitor = stampit(BaseExternalDocumentationVisitor, {
  init() {
    this.element = new ExternalDocumentationElement();
  },
});

export default ExternalDocumentationVisitor;
