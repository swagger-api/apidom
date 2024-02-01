import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ParameterElement from '../../../../elements/Parameter';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';

export interface ParameterVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

class ParameterVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: ParameterElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Parameter']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: ParameterVisitorOptions) {
    super(options);
    this.element = new ParameterElement();
    this.specPath = always(['document', 'objects', 'Parameter']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default ParameterVisitor;
