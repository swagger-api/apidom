import {
  LinkDescriptionVisitor as JSONSchemaDraft6LinkDescriptionVisitor,
  LinkDescriptionVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-draft-6';

import LinkDescriptionElement from '../../../../elements/LinkDescription.ts';

export type { LinkDescriptionVisitorOptions };

/**
 * @public
 */
class LinkDescriptionVisitor extends JSONSchemaDraft6LinkDescriptionVisitor {
  declare public readonly element: LinkDescriptionElement;

  constructor(options: LinkDescriptionVisitorOptions) {
    super(options);
    this.element = new LinkDescriptionElement();
  }
}

export default LinkDescriptionVisitor;
