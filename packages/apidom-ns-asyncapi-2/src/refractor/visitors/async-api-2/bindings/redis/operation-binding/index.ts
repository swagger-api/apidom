import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import RedisOperationBindingElement from '../../../../../../elements/bindings/redis/RedisOperationBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class RedisOperationBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: RedisOperationBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'redis', 'OperationBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new RedisOperationBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'redis', 'OperationBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default RedisOperationBindingVisitor;
