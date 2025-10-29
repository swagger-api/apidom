import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import RedisOperationBindingElement from '../../../../../../elements/bindings/redis/RedisOperationBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface RedisOperationBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class RedisOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: RedisOperationBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'redis', 'OperationBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: RedisOperationBindingVisitorOptions) {
    super(options);
    this.element = new RedisOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'redis', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default RedisOperationBindingVisitor;
