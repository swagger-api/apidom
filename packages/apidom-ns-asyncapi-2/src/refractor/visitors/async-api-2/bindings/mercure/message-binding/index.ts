import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MercureMessageBindingElement from '../../../../../../elements/bindings/mercure/MercureMessageBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface MercureMessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class MercureMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: MercureMessageBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'mercure', 'MessageBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: MercureMessageBindingVisitorOptions) {
    super(options);
    this.element = new MercureMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'mercure', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default MercureMessageBindingVisitor;
