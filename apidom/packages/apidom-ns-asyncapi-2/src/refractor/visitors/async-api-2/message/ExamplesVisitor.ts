import stampit from 'stampit';
import { ArrayElement, Element, MemberElement, isObjectElement, BREAK } from 'apidom';

import FallbackVisitor from '../../FallbackVisitor';

const ExamplesVisitor = stampit(FallbackVisitor, {
  init() {
    this.element = new ArrayElement();
    this.element.classes.push('examples');
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      const fixedFields = ['payload', 'header', 'name', 'summary'];

      arrayElement.forEach((item: Element) => {
        const element = item.clone();

        // this object has no formal name/type so we're processing it in dynamic way here
        if (isObjectElement(item)) {
          // @ts-ignore
          element.forEach((value: Element, key: Element, member: MemberElement) => {
            if (fixedFields.includes(key.toValue())) {
              member.classes.push('fixed-field');
            }
          });
        }

        this.element.push(element);
      });

      this.copyMetaAndAttributes(arrayElement, this.element);

      return BREAK;
    },
  },
});

export default ExamplesVisitor;
