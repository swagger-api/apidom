import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import RedisChannelBindingElement from '../../../../../../elements/bindings/redis/RedisChannelBinding';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../../../FallbackVisitor';

class RedisChannelBindingVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: RedisChannelBindingElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'bindings', 'redis', 'ChannelBinding']
  >;

  protected declare readonly canSupportSpecificationExtensions: false;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new RedisChannelBindingElement();
    this.specPath = always(['document', 'objects', 'bindings', 'redis', 'ChannelBinding']);
    this.canSupportSpecificationExtensions = false;
  }
}

export default RedisChannelBindingVisitor;
