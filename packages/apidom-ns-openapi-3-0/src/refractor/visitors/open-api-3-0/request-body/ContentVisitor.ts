import RequestBodyContentElement from '../../../../elements/nces/RequestBodyContent.ts';
import BaseContentVisitor, { ContentVisitorOptions } from '../ContentVisitor.ts';

export type { ContentVisitorOptions };

/**
 * @public
 */
class ContentVisitor extends BaseContentVisitor {
  declare public readonly element: RequestBodyContentElement;

  constructor(options: ContentVisitorOptions) {
    super(options);
    this.element = new RequestBodyContentElement();
  }
}

export default ContentVisitor;
