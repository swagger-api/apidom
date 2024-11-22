import BaseContentVisitor, { ContentVisitorOptions } from '../ContentVisitor.ts';
import HeaderContentElement from '../../../../elements/nces/HeaderContent.ts';

export type { ContentVisitorOptions };

/**
 * @public
 */
class ContentVisitor extends BaseContentVisitor {
  public declare readonly element: HeaderContentElement;

  constructor(options: ContentVisitorOptions) {
    super(options);
    this.element = new HeaderContentElement();
  }
}

export default ContentVisitor;
