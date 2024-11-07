import RequestBodyContentElement from '../../../../elements/nces/RequestBodyContent.ts';
import BaseContentVisitor, { ContentVisitorOptions } from '../ContentVisitor.ts';

export type { ContentVisitorOptions };

class ContentVisitor extends BaseContentVisitor {
  public declare readonly element: RequestBodyContentElement;

  constructor(options: ContentVisitorOptions) {
    super(options);
    this.element = new RequestBodyContentElement();
  }
}

export default ContentVisitor;
