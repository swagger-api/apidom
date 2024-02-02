import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import ServerBindingsElement from '../../../../elements/ServerBindings';

class ServerBindingsVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: ServerBindingsElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'ServerBindings']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new ServerBindingsElement();
    this.specPath = always(['document', 'objects', 'ServerBindings']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default ServerBindingsVisitor;
