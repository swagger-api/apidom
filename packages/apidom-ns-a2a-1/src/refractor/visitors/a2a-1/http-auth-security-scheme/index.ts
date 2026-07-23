import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import HTTPAuthSecuritySchemeElement from '../../../../elements/HTTPAuthSecurityScheme.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface HTTPAuthSecuritySchemeVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class HTTPAuthSecuritySchemeVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: HTTPAuthSecuritySchemeElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'HTTPAuthSecurityScheme']>;

  constructor(options: HTTPAuthSecuritySchemeVisitorOptions) {
    super(options);
    this.element = new HTTPAuthSecuritySchemeElement();
    this.specPath = always(['document', 'objects', 'HTTPAuthSecurityScheme']);
  }
}

export default HTTPAuthSecuritySchemeVisitor;
