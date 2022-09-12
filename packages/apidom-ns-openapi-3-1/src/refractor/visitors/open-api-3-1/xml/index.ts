import stampit from 'stampit';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-0';

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

const XmlVisitor = stampit(BaseXMLVisitor, {
  init() {
    this.element = new XmlElement();
  },
});

export default XmlVisitor;
