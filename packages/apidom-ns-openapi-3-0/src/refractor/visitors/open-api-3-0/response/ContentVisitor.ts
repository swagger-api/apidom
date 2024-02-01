import ResponseContentElement from '../../../../elements/nces/ResponseContent';
import BaseContentVisitor, { ContentVisitorOptions } from '../ContentVisitor';

export type { ContentVisitorOptions };

class ContentVisitor extends BaseContentVisitor {
  public declare readonly element: ResponseContentElement;

  constructor(options: ContentVisitorOptions) {
    super(options);
    this.element = new ResponseContentElement();
  }
}

export default ContentVisitor;
