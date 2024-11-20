import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import FixedFieldsVisitor, {
  FixedFieldsVisitorOptions,
  SpecPath,
} from '../generics/FixedFieldsVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';
import JSONSchemaElement from '../../../elements/JSONSchema.ts';

/**
 * @public
 */
export interface JSONSchemaVisitorOptions
  extends FixedFieldsVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
export const JSONSchemaVisitorBase = Mixin(FixedFieldsVisitor, FallbackVisitor);

/**
 * @public
 */
class JSONSchemaVisitor extends JSONSchemaVisitorBase {
  public declare element: JSONSchemaElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'JSONSchema']>;

  constructor(options: JSONSchemaVisitorOptions) {
    super(options);
    this.element = new JSONSchemaElement();
    this.specPath = always(['document', 'objects', 'JSONSchema']);
  }
}

export default JSONSchemaVisitor;
