import { StringElement } from '@swagger-api/apidom-core';
import { XmlElement } from '@swagger-api/apidom-ns-openapi-3-1';

/**
 * @public
 */
class Xml extends XmlElement {
  /**
   * OpenAPI 3.2: Specifies the XML node type (element, attribute, text, etc.).
   */
  get nodeType(): StringElement | undefined {
    return this.get('nodeType');
  }

  set nodeType(nodeType: StringElement | undefined) {
    this.set('nodeType', nodeType);
  }
}

export default Xml;
