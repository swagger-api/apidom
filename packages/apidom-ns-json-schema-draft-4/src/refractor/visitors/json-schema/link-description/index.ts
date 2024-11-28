import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import LinkDescriptionElement from '../../../../elements/LinkDescription.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface LinkDescriptionVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class LinkDescriptionVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: LinkDescriptionElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'LinkDescription']>;

  constructor(options: LinkDescriptionVisitorOptions) {
    super(options);
    this.element = new LinkDescriptionElement();
    this.specPath = always(['document', 'objects', 'LinkDescription']);
  }
}

export default LinkDescriptionVisitor;
