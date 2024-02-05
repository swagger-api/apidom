import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import ServerBindingsElement from '../../../../elements/ServerBindings';

export interface ServerBindingsVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class ServerBindingsVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: ServerBindingsElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'ServerBindings']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: ServerBindingsVisitorOptions) {
    super(options);
    this.element = new ServerBindingsElement();
    this.specPath = always(['document', 'objects', 'ServerBindings']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default ServerBindingsVisitor;
