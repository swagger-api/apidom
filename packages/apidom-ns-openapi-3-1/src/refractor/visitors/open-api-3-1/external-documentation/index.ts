import {
  specificationObj as OpenApi3_1Specification,
  FixedFieldsVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

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

class ExternalDocumentationVisitor extends BaseExternalDocumentationVisitor {
  public declare readonly element: ExternalDocumentationElement;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new ExternalDocumentationElement();
  }
}

export default ExternalDocumentationVisitor;
