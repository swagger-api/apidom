import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import APIKeySecuritySchemeElement from '../../../../elements/APIKeySecurityScheme.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface APIKeySecuritySchemeVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class APIKeySecuritySchemeVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: APIKeySecuritySchemeElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'APIKeySecurityScheme']>;

  constructor(options: APIKeySecuritySchemeVisitorOptions) {
    super(options);
    this.element = new APIKeySecuritySchemeElement();
    this.specPath = always(['document', 'objects', 'APIKeySecurityScheme']);
  }
}

export default APIKeySecuritySchemeVisitor;
