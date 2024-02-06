import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import ResponsesDefinitionsElement from '../../../../elements/ResponsesDefinitions';
import MapVisitor, { MapVisitorOptions, SpecPath } from '../../generics/MapVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

export interface ResponsesDefinitionsVisitorOptions
  extends MapVisitorOptions,
    FallbackVisitorOptions {}

class ResponsesDefinitionsVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  public declare readonly element: ResponsesDefinitionsElement;

  protected declare readonly specPath: SpecPath<['document', 'objects', 'Response']>;

  constructor(options: ResponsesDefinitionsVisitorOptions) {
    super(options);
    this.element = new ResponsesDefinitionsElement();
    this.specPath = always(['document', 'objects', 'Response']);
  }
}

export default ResponsesDefinitionsVisitor;
