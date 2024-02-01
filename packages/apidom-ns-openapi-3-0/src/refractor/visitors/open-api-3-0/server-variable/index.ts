import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ServerVariableElement from '../../../../elements/ServerVariable';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

export interface ServerVariableVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class ServerVariableVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: ServerVariableElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'ServerVariable']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: ServerVariableVisitorOptions) {
    super(options);
    this.element = new ServerVariableElement();
    this.specPath = always(['document', 'objects', 'ServerVariable']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default ServerVariableVisitor;
