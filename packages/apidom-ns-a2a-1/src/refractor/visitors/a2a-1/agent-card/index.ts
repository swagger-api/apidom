import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import AgentCardElement from '../../../../elements/AgentCard.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface AgentCardVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class AgentCardVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: AgentCardElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'AgentCard']>;

  constructor(options: AgentCardVisitorOptions) {
    super(options);
    this.element = new AgentCardElement();
    this.specPath = always(['document', 'objects', 'AgentCard']);
  }
}

export default AgentCardVisitor;
