import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import InfoElement from '../../../../elements/Info';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';

export interface InfoVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

class InfoVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: InfoElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Info']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: InfoVisitorOptions) {
    super(options);
    this.element = new InfoElement();
    this.specPath = always(['document', 'objects', 'Info']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default InfoVisitor;
