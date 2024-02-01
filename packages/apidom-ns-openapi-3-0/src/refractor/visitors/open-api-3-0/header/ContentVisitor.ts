import BaseContentVisitor, { ContentVisitorOptions } from '../ContentVisitor';
import HeaderContentElement from '../../../../elements/nces/HeaderContent';

export type { ContentVisitorOptions };

class ContentVisitor extends BaseContentVisitor {
  public declare readonly element: HeaderContentElement;

  constructor(options: ContentVisitorOptions) {
    super(options);
    this.element = new HeaderContentElement();
  }
}

export default ContentVisitor;
