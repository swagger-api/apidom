import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import XmlElement from '../../../../elements/Xml';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class XmlVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: XmlElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'XML']>;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new XmlElement();
    this.specPath = always(['document', 'objects', 'XML']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default XmlVisitor;
