import stampit from 'stampit';
import { test, always } from 'ramda';
import { ObjectElement, StringElement } from '@swagger-api/apidom-core';

import CallbackElement from '../../../../elements/Callback';
import PathItemElement from '../../../../elements/PathItem';
import PatternedFieldsVisitor from '../../generics/PatternedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import MapVisitor from '../../generics/MapVisitor';
import { isPathItemElement } from '../../../../predicates';

const CallbackVisitor = stampit(PatternedFieldsVisitor, FallbackVisitor, {
  props: {
    fieldPatternPredicate: test(/{(?<expression>.*)}/),
    specPath: always(['document', 'objects', 'PathItem']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new CallbackElement();
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = MapVisitor.compose.methods.ObjectElement.call(this, objectElement);

      // decorate every PathItemElement with Callback Object expression metadata
      this.element
        .filter(isPathItemElement)
        .forEach((pathItemElement: PathItemElement, key: StringElement) => {
          pathItemElement.setMetaProperty('runtime-expression', key.toValue());
        });

      return result;
    },
  },
});

export default CallbackVisitor;
