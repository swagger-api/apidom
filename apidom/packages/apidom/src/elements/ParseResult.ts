import { ArrayElement, Attributes, Element, Meta } from 'minim';

class ParseResult extends ArrayElement {
  constructor(content: Array<any>, meta: Meta, attributes: Attributes) {
    super(content, meta, attributes);
    this.element = 'parseResult';
  }

  get api(): Element | undefined {
    return this.children.filter((item) => item.classes.contains('api')).first;
  }

  get annotations(): ArrayElement {
    return this.children.filter((item) => item.element === 'annotation');
  }

  get warnings(): ArrayElement {
    return this.children.filter(
      (item) => item.element === 'annotation' && item.classes.contains('warning'),
    );
  }

  get errors(): ArrayElement {
    return this.children.filter(
      (item) => item.element === 'annotation' && item.classes.contains('error'),
    );
  }
}

export default ParseResult;
