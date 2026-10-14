import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import AgentProviderElement from '../../../../elements/AgentProvider.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface AgentProviderVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class AgentProviderVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: AgentProviderElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'AgentProvider']>;

  constructor(options: AgentProviderVisitorOptions) {
    super(options);
    this.element = new AgentProviderElement();
    this.specPath = always(['document', 'objects', 'AgentProvider']);
  }
}

export default AgentProviderVisitor;
