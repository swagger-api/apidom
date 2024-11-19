import { Attributes, Meta, StringElement } from 'minim';

/**
 * @public
 */
class Comment extends StringElement {
  constructor(content?: string, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'comment';
  }
}

export default Comment;
