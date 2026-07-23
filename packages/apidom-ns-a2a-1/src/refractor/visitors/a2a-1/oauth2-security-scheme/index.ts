import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import OAuth2SecuritySchemeElement from '../../../../elements/OAuth2SecurityScheme.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface OAuth2SecuritySchemeVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class OAuth2SecuritySchemeVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: OAuth2SecuritySchemeElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'OAuth2SecurityScheme']>;

  constructor(options: OAuth2SecuritySchemeVisitorOptions) {
    super(options);
    this.element = new OAuth2SecuritySchemeElement();
    this.specPath = always(['document', 'objects', 'OAuth2SecurityScheme']);
  }
}

export default OAuth2SecuritySchemeVisitor;
