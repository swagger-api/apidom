import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import AgentCapabilitiesElement from '../../../../elements/AgentCapabilities.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface AgentCapabilitiesVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class AgentCapabilitiesVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: AgentCapabilitiesElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'AgentCapabilities']>;

  constructor(options: AgentCapabilitiesVisitorOptions) {
    super(options);
    this.element = new AgentCapabilitiesElement();
    this.specPath = always(['document', 'objects', 'AgentCapabilities']);
  }
}

export default AgentCapabilitiesVisitor;
