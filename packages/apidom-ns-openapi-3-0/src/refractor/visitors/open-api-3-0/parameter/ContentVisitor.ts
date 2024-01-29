import BaseContentVisitor, { ContentVisitorOptions } from '../ContentVisitor';
import ParameterContentElement from '../../../../elements/nces/ParameterContent';

class ExamplesVisitor extends BaseContentVisitor {
  public declare readonly element: ParameterContentElement;

  constructor(options: ContentVisitorOptions) {
    super(options);
    this.element = new ParameterContentElement();
  }
}

export default ExamplesVisitor;
