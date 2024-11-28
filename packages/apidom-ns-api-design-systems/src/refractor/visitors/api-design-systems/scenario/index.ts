import { always } from 'ramda';
import { Mixin } from 'ts-mixer';

import ScenarioElement from '../../../../elements/Scenario.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface ScenarioVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class ScenarioVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: ScenarioElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Scenario']>;

  constructor(options: ScenarioVisitorOptions) {
    super(options);
    this.element = new ScenarioElement();
    this.specPath = always(['document', 'objects', 'Scenario']);
  }
}

export default ScenarioVisitor;
