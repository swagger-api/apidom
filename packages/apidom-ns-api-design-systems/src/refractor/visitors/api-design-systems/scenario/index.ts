import { always } from 'ramda';
import { Mixin } from 'ts-mixer';

import ScenarioElement from '../../../../elements/Scenario';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

class ScenarioVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  public readonly element: ScenarioElement;

  constructor(options = {}) {
    super(options);
    this.specPath = always(['document', 'objects', 'Scenario']);
    this.element = new ScenarioElement();
  }
}

export default ScenarioVisitor;
