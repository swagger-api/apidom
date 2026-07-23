import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import AgentExtensionElement from '../../../../elements/AgentExtension.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface AgentExtensionVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class AgentExtensionVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: AgentExtensionElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'AgentExtension']>;

  constructor(options: AgentExtensionVisitorOptions) {
    super(options);
    this.element = new AgentExtensionElement();
    this.specPath = always(['document', 'objects', 'AgentExtension']);
  }
}

export default AgentExtensionVisitor;
