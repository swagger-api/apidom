import { Mixin } from 'ts-mixer';
import { ifElse, always } from 'ramda';
import {
  RequestBodyContentElement,
  MapVisitor,
  MapVisitorOptions,
  SpecPath,
  FallbackVisitor,
  FallbackVisitorOptions,
  isReferenceLikeElement,
} from '@swagger-api/apidom-ns-openapi-3-0';

/**
 * @public
 */
export interface ContentVisitorOptions extends MapVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class ContentVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: RequestBodyContentElement;

  declare protected readonly specPath: SpecPath<
    ['document', 'objects', 'MediaType'] | ['document', 'objects', 'Reference']
  >;

  constructor(options: ContentVisitorOptions) {
    super(options);
    this.element = new RequestBodyContentElement();
    this.specPath = ifElse(
      isReferenceLikeElement,
      always(['document', 'objects', 'Reference']),
      always(['document', 'objects', 'MediaType']),
    ) as SpecPath<['document', 'objects', 'MediaType'] | ['document', 'objects', 'Reference']>;
  }
}

export default ContentVisitor;
