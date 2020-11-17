import { ArrayElement, ArraySlice, Attributes, Element, Meta } from 'minim';

class ParseResult extends ArrayElement {
  constructor(content?: Array<any>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'parseResult';
  }

  get api(): Element | undefined {
    return this.children.filter((item) => item.classes.contains('api')).first;
  }

  get annotations(): ArraySlice {
    return this.children.filter((item) => item.element === 'annotation');
  }

  get warnings(): ArraySlice {
    return this.children.filter(
      (item) => item.element === 'annotation' && item.classes.contains('warning'),
    );
  }

  get errors(): ArraySlice {
    return this.children.filter(
      (item) => item.element === 'annotation' && item.classes.contains('error'),
    );
  }

  get isEmpty(): boolean {
    return this.children.reject((item) => item.element === 'annotation').isEmpty;
  }
}

export default ParseResult;
