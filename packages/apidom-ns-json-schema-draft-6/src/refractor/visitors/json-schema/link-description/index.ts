import {
  LinkDescriptionVisitor as JSONSchemaDraft4LinkDescriptionVisitor,
  LinkDescriptionVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

import LinkDescriptionElement from '../../../../elements/LinkDescription.ts';

export type { LinkDescriptionVisitorOptions };

/**
 * @public
 */
class LinkDescriptionVisitor extends JSONSchemaDraft4LinkDescriptionVisitor {
  declare public readonly element: LinkDescriptionElement;

  constructor(options: LinkDescriptionVisitorOptions) {
    super(options);
    this.element = new LinkDescriptionElement();
  }
}

export default LinkDescriptionVisitor;
