import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import InfoElement from '../../../../elements/Info.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface InfoVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class InfoVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: InfoElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Info']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: InfoVisitorOptions) {
    super(options);
    this.element = new InfoElement();
    this.specPath = always(['document', 'objects', 'Info']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default InfoVisitor;
