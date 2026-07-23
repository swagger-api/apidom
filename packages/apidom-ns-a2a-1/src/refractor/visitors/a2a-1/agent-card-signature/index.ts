import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import AgentCardSignatureElement from '../../../../elements/AgentCardSignature.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface AgentCardSignatureVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class AgentCardSignatureVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: AgentCardSignatureElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'AgentCardSignature']>;

  constructor(options: AgentCardSignatureVisitorOptions) {
    super(options);
    this.element = new AgentCardSignatureElement();
    this.specPath = always(['document', 'objects', 'AgentCardSignature']);
  }
}

export default AgentCardSignatureVisitor;
