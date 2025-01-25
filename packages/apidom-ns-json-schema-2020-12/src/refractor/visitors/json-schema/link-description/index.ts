import {
  LinkDescriptionVisitor as JSONSchemaDraft201909LinkDescriptionVisitor,
  LinkDescriptionVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-2019-09';

import LinkDescriptionElement from '../../../../elements/LinkDescription.ts';

export type { LinkDescriptionVisitorOptions };

/**
 * @public
 */
class LinkDescriptionVisitor extends JSONSchemaDraft201909LinkDescriptionVisitor {
  declare public readonly element: LinkDescriptionElement;

  constructor(options: LinkDescriptionVisitorOptions) {
    super(options);
    this.element = new LinkDescriptionElement();
  }
}

export default LinkDescriptionVisitor;
