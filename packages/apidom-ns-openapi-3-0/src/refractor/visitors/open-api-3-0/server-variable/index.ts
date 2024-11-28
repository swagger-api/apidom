import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ServerVariableElement from '../../../../elements/ServerVariable.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface ServerVariableVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class ServerVariableVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: ServerVariableElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'ServerVariable']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: ServerVariableVisitorOptions) {
    super(options);
    this.element = new ServerVariableElement();
    this.specPath = always(['document', 'objects', 'ServerVariable']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default ServerVariableVisitor;
