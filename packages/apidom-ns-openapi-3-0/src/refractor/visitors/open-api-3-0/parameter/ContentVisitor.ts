import BaseContentVisitor, { ContentVisitorOptions } from '../ContentVisitor.ts';
import ParameterContentElement from '../../../../elements/nces/ParameterContent.ts';

export type { ContentVisitorOptions };

class ContentVisitor extends BaseContentVisitor {
  public declare readonly element: ParameterContentElement;

  constructor(options: ContentVisitorOptions) {
    super(options);
    this.element = new ParameterContentElement();
  }
}

export default ContentVisitor;
