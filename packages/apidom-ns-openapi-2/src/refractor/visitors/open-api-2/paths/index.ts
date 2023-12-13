import stampit from 'stampit';
import { T as stubTrue, always } from 'ramda';
import { ObjectElement, StringElement, cloneDeep } from '@swagger-api/apidom-core';

import PathsElement from '../../../../elements/Paths';
import PathItemElement from '../../../../elements/PathItem';
import PatternedFieldsVisitor from '../../generics/PatternedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isPathItemElement } from '../../../../predicates';

const PathsVisitor = stampit(PatternedFieldsVisitor, FallbackVisitor, {
  props: {
    fieldPatternPredicate: stubTrue,
    specPath: always(['document', 'objects', 'PathItem']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new PathsElement();
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = PatternedFieldsVisitor.compose.methods.ObjectElement.call(this, objectElement);

      // decorate every PathItemElement with path metadata
      this.element
        .filter(isPathItemElement)
        .forEach((pathItemElement: PathItemElement, key: StringElement) => {
          key.classes.push('openapi-path-template');
          key.classes.push('path-template');
          pathItemElement.setMetaProperty('path', cloneDeep(key));
        });

      return result;
    },
  },
});

export default PathsVisitor;
