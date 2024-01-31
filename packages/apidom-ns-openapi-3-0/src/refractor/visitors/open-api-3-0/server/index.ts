import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ServerElement from '../../../../elements/Server';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class ServerVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: ServerElement;

  public declare readonly specPath: SpecPath<['document', 'objects', 'Server']>;

  public declare readonly canSupportSpecificationExtensions: true;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new ServerElement();
    this.specPath = always(['document', 'objects', 'Server']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default ServerVisitor;
