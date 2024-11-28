import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MessageTraitElement from '../../../../elements/MessageTrait.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface MessageTraitVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class MessageTraitVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: MessageTraitElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'MessageTrait']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: MessageTraitVisitorOptions) {
    super(options);
    this.element = new MessageTraitElement();
    this.specPath = always(['document', 'objects', 'MessageTrait']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default MessageTraitVisitor;
