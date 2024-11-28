import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ServerElement from '../../../../elements/Server.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface ServerVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class ServerVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: ServerElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Server']>;

  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: ServerVisitorOptions) {
    super(options);
    this.element = new ServerElement();
    this.specPath = always(['document', 'objects', 'Server']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default ServerVisitor;
