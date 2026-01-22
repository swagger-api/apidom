import { StringElement, Attributes, Meta } from '@swagger-api/apidom-core';
import { TagElement } from '@swagger-api/apidom-ns-openapi-3-1';

/**
 * @public
 */
class Tag extends TagElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
  }

  /**
   * OpenAPI 3.2: Brief summary of the tag.
   */
  get summary(): StringElement | undefined {
    return this.get('summary');
  }

  set summary(summary: StringElement | undefined) {
    this.set('summary', summary);
  }

  /**
   * OpenAPI 3.2: Reference to parent tag name for hierarchical organization.
   * Note: Due to naming conflict with Element.parent, access via get('parent')/set('parent', value).
   */
  // parent property intentionally omitted due to conflict with Element.parent

  /**
   * OpenAPI 3.2: Classification of the tag (e.g., "nav", "badge", "audience").
   */
  get kind(): StringElement | undefined {
    return this.get('kind');
  }

  set kind(kind: StringElement | undefined) {
    this.set('kind', kind);
  }
}

export default Tag;
