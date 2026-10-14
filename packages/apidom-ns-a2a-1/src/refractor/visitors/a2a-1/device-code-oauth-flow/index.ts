import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import DeviceCodeOAuthFlowElement from '../../../../elements/DeviceCodeOAuthFlow.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../../generics/FixedFieldsVisitor.ts';

/**
 * @public
 */
export interface DeviceCodeOAuthFlowVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class DeviceCodeOAuthFlowVisitor extends Mixin(FixedFieldsVisitor, FallbackVisitor) {
  declare public readonly element: DeviceCodeOAuthFlowElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'DeviceCodeOAuthFlow']>;

  constructor(options: DeviceCodeOAuthFlowVisitorOptions) {
    super(options);
    this.element = new DeviceCodeOAuthFlowElement();
    this.specPath = always(['document', 'objects', 'DeviceCodeOAuthFlow']);
  }
}

export default DeviceCodeOAuthFlowVisitor;
