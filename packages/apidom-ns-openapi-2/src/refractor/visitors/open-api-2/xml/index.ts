import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import XmlElement from '../../../../elements/Xml.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface XmlVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class XmlVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: XmlElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'XML']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: XmlVisitorOptions) {
    super(options);
    this.element = new XmlElement();
    this.specPath = always(['document', 'objects', 'XML']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default XmlVisitor;
