import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import AgentInterfaceElement from '../../../../elements/AgentInterface.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface AgentInterfaceVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class AgentInterfaceVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: AgentInterfaceElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'AgentInterface']>;

  constructor(options: AgentInterfaceVisitorOptions) {
    super(options);
    this.element = new AgentInterfaceElement();
    this.specPath = always(['document', 'objects', 'AgentInterface']);
  }
}

export default AgentInterfaceVisitor;
