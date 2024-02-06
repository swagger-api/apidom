import { always } from 'ramda';
import { Mixin } from 'ts-mixer';

import ScenarioElement from '../../../../elements/Scenario';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor';

export interface ScenarioVisitorOptions extends FixedFieldsVisitorOptions, FallbackVisitorOptions {}

class ScenarioVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public declare readonly element: ScenarioElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Scenario']>;

  constructor(options: ScenarioVisitorOptions) {
    super(options);
    this.element = new ScenarioElement();
    this.specPath = always(['document', 'objects', 'Scenario']);
  }
}

export default ScenarioVisitor;
