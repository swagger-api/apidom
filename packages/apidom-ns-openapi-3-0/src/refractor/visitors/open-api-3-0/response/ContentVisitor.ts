import ResponseContentElement from '../../../../elements/nces/ResponseContent.ts';
import BaseContentVisitor, { ContentVisitorOptions } from '../ContentVisitor.ts';

export type { ContentVisitorOptions };

/**
 * @public
 */
class ContentVisitor extends BaseContentVisitor {
  declare public readonly element: ResponseContentElement;

  constructor(options: ContentVisitorOptions) {
    super(options);
    this.element = new ResponseContentElement();
  }
}

export default ContentVisitor;
