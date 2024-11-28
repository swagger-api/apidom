import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import RedisMessageBindingElement from '../../../../../../elements/bindings/redis/RedisMessageBinding.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor.ts';

/**
 * @public
 */
export interface RedisMessageBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class RedisMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: RedisMessageBindingElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'redis', 'MessageBinding']
  >;

  declare protected readonly canSupportSpecificationExtensions: false;

  constructor(options: RedisMessageBindingVisitorOptions) {
    super(options);
    this.element = new RedisMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'redis', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default RedisMessageBindingVisitor;
