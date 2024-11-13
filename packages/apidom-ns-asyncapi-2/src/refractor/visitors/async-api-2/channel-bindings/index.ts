import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import ChannelBindingsElement from '../../../../elements/ChannelBindings.ts';

export interface ChannelBindingsVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class ChannelBindingsVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: ChannelBindingsElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'ChannelBindings']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: ChannelBindingsVisitorOptions) {
    super(options);
    this.element = new ChannelBindingsElement();
    this.specPath = always(['document', 'objects', 'ChannelBindings']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default ChannelBindingsVisitor;
