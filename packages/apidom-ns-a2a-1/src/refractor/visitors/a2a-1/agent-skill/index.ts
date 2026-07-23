import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import AgentSkillElement from '../../../../elements/AgentSkill.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface AgentSkillVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class AgentSkillVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: AgentSkillElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'AgentSkill']>;

  constructor(options: AgentSkillVisitorOptions) {
    super(options);
    this.element = new AgentSkillElement();
    this.specPath = always(['document', 'objects', 'AgentSkill']);
  }
}

export default AgentSkillVisitor;
