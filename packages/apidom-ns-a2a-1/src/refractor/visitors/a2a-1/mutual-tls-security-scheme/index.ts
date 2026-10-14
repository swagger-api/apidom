import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MutualTlsSecuritySchemeElement from '../../../../elements/MutualTlsSecurityScheme.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface MutualTlsSecuritySchemeVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class MutualTlsSecuritySchemeVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: MutualTlsSecuritySchemeElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'MutualTlsSecurityScheme']>;

  constructor(options: MutualTlsSecuritySchemeVisitorOptions) {
    super(options);
    this.element = new MutualTlsSecuritySchemeElement();
    this.specPath = always(['document', 'objects', 'MutualTlsSecurityScheme']);
  }
}

export default MutualTlsSecuritySchemeVisitor;
