import {
  specificationObj as OpenApi3_1Specification,
  XmlVisitorOptions,
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

export type { XmlVisitorOptions };
class XmlVisitor extends BaseXMLVisitor {
  public declare readonly element: XmlElement;

  constructor(options: XmlVisitorOptions) {
    super(options);
    this.element = new XmlElement();
  }
}

export default XmlVisitor;
