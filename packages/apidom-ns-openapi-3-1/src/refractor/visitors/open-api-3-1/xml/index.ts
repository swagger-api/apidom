import {
  specificationObj as OpenApi3_1Specification,
  FixedFieldsVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

import XmlElement from '../../../../elements/Xml';

const {
  visitors: {
    document: {
      objects: {
        XML: { $visitor: BaseXMLVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

class XmlVisitor extends BaseXMLVisitor {
  public declare readonly element: XmlElement;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new XmlElement();
  }
}

export default XmlVisitor;
