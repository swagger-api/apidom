import {
  specificationObj as OpenApi3_1Specification,
  XmlVisitorOptions,
  XmlVisitor as XmlVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-0';

import XmlElement from '../../../../elements/Xml.ts';

/**
 * @public
 */
export const BaseXMLVisitor: typeof XmlVisitorType =
  OpenApi3_1Specification.visitors.document.objects.XML.$visitor;

export type { XmlVisitorOptions };

/**
 * @public
 */
class XmlVisitor extends BaseXMLVisitor {
  declare public readonly element: XmlElement;

  constructor(options: XmlVisitorOptions) {
    super(options);
    this.element = new XmlElement();
  }
}

export default XmlVisitor;
