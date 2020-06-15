import { Attributes, Meta, StringElement } from 'minim';

class Comment extends StringElement {
  constructor(content: Array<unknown>, meta: Meta, attributes: Attributes) {
    super(content, meta, attributes);
    this.element = 'comment';
  }
}

export default Comment;
