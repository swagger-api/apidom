import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import OpenIdConnectSecuritySchemeElement from '../../../../elements/OpenIdConnectSecurityScheme.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface OpenIdConnectSecuritySchemeVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class OpenIdConnectSecuritySchemeVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: OpenIdConnectSecuritySchemeElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'OpenIdConnectSecurityScheme']
  >;

  constructor(options: OpenIdConnectSecuritySchemeVisitorOptions) {
    super(options);
    this.element = new OpenIdConnectSecuritySchemeElement();
    this.specPath = always(['document', 'objects', 'OpenIdConnectSecurityScheme']);
  }
}

export default OpenIdConnectSecuritySchemeVisitor;
