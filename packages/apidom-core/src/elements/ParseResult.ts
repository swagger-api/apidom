import { ArrayElement, ArraySlice, Attributes, Element, Meta } from 'minim';
import { isUndefined } from 'ramda-adjunct';

/**
 * @public
 */
class ParseResult extends ArrayElement {
  constructor(content?: Array<any>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'parseResult';
  }

  get api(): Element | undefined {
    return this.children.filter((item) => item.classes.contains('api')).first;
  }

  get results(): ArraySlice {
    return this.children.filter((item) => item.classes.contains('result'));
  }

  get result(): Element | undefined {
    return this.results.first;
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

  replaceResult(replacement: Element): boolean {
    const { result } = this;

    if (isUndefined(result)) {
      return false;
    }

    // @ts-ignore
    const searchIndex = this.content.findIndex((e) => e === result);
    if (searchIndex === -1) {
      return false;
    }

    this.content[searchIndex] = replacement;

    return true;
  }
}

export default ParseResult;
