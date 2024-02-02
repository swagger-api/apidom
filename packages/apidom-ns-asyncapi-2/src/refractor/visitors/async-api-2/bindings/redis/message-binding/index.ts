import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import RedisMessageBindingElement from '../../../../../../elements/bindings/redis/RedisMessageBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class RedisMessageBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: RedisMessageBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'redis', 'MessageBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new RedisMessageBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'redis', 'MessageBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default RedisMessageBindingVisitor;
