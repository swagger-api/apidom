import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import ChannelBindingsElement from '../../../../elements/ChannelBindings.ts';

/**
 * @public
 */
export interface ChannelBindingsVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class ChannelBindingsVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: ChannelBindingsElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'ChannelBindings']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: ChannelBindingsVisitorOptions) {
    super(options);
    this.element = new ChannelBindingsElement();
    this.specPath = always(['document', 'objects', 'ChannelBindings']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default ChannelBindingsVisitor;
