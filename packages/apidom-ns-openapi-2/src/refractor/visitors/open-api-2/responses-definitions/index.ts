import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ResponsesDefinitionsElement from '../../../../elements/ResponsesDefinitions.ts';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface ResponsesDefinitionsVisitorOptions
  extends MapVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class ResponsesDefinitionsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: ResponsesDefinitionsElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'Response']>;

  constructor(options: ResponsesDefinitionsVisitorOptions) {
    super(options);
    this.element = new ResponsesDefinitionsElement();
    this.specPath = always(['document', 'objects', 'Response']);
  }
}

export default ResponsesDefinitionsVisitor;
