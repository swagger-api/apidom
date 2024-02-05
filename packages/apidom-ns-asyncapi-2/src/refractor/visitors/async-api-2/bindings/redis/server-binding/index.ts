import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import RedisServerBindingElement from '../../../../../../elements/bindings/redis/RedisServerBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../../../FallbackVisitor';

export interface RedisServerBindingVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class RedisServerBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: RedisServerBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'redis', 'ServerBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: RedisServerBindingVisitorOptions) {
    super(options);
    this.element = new RedisServerBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'redis', 'ServerBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default RedisServerBindingVisitor;
