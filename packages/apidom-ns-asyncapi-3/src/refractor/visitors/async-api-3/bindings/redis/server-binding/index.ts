import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import RedisServerBindingElement from '../../../../../../elements/bindings/redis/RedisServerBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface RedisServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class RedisServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: RedisServerBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'redis', 'ServerBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: RedisServerBindingVisitorOptions) {
    super(options);
    this.element = new RedisServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'redis', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default RedisServerBindingVisitor;
