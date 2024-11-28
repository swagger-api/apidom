import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import ServerBindingsElement from '../../../../elements/ServerBindings.ts';

/**
 * @public
 */
export interface ServerBindingsVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class ServerBindingsVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: ServerBindingsElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'ServerBindings']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: ServerBindingsVisitorOptions) {
    super(options);
    this.element = new ServerBindingsElement();
    this.specPath = always(['document', 'objects', 'ServerBindings']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default ServerBindingsVisitor;
