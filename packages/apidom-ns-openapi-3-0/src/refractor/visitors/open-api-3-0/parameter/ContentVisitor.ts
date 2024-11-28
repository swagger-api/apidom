import BaseContentVisitor, { ContentVisitorOptions } from '../ContentVisitor.ts';
import ParameterContentElement from '../../../../elements/nces/ParameterContent.ts';

export type { ContentVisitorOptions };

/**
 * @public
 */
class ContentVisitor extends BaseContentVisitor {
  declare public readonly element: ParameterContentElement;

  constructor(options: ContentVisitorOptions) {
    super(options);
    this.element = new ParameterContentElement();
  }
}

export default ContentVisitor;
