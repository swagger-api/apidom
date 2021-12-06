import stampit from 'stampit';
import { always } from 'ramda';
import { ObjectElement, isStringElement } from '@swagger-api/apidom-core';

import ChannelItemElement from '../../../../elements/ChannelItem';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const ChannelItemVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ChannelItem']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new ChannelItemElement();
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = FixedFieldsVisitor.compose.methods.ObjectElement.call(this, objectElement);

      // mark this ChannelItemElement with reference metadata
      if (isStringElement(this.element.$ref)) {
        this.element.classes.push('reference-element');
        this.element.setMetaProperty('referenced-element', 'channelItem');
      }

      return result;
    },
  },
});

export default ChannelItemVisitor;
