import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import DiscriminatorElement from '../../../../elements/Discriminator.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface DiscriminatorVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class DiscriminatorVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: DiscriminatorElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Discriminator']>;

  declare protected canSupportSpecificationExtensions: boolean;

  constructor(options: DiscriminatorVisitorOptions) {
    super(options);
    this.element = new DiscriminatorElement();
    this.specPath = always(['document', 'objects', 'Discriminator']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default DiscriminatorVisitor;
