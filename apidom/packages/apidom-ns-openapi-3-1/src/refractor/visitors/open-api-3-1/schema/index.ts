import stampit from 'stampit';
import { always, defaultTo } from 'ramda';
import { isNonEmptyString, isNull } from 'ramda-adjunct';
import { ObjectElement, ArrayElement, BooleanElement, isStringElement, BREAK } from 'apidom';

import { isSchemaElement, isJsonSchemaDialectElement } from '../../../../predicates';
import SchemaElement from '../../../../elements/Schema';
import JsonSchemaDialect from '../../../../elements/JsonSchemaDialect';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';
import ParentSchemaAwareVisitor from './ParentSchemaAwareVisitor';

const SchemaVisitor = stampit(FixedFieldsVisitor, ParentSchemaAwareVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Schema']),
    canSupportSpecificationExtensions: true,
  },
  // @ts-ignore
  init() {
    /**
     * Private Api.
     */

    /**
     * This function depends on some external context, so we need to make sure this function
     * works even when no context is provided like when directly refracting generic Object Element
     * into Schema Element: SchemaElement.refract(new ObjectElement({ type: 'object' });
     */
    const getJsonSchemaDialect = () => {
      let jsonSchemaDialect;

      if (
        this.openApi3_1Element !== null &&
        isJsonSchemaDialectElement(this.openApi3_1Element.jsonSchemaDialect)
      ) {
        jsonSchemaDialect = this.openApi3_1Element.jsonSchemaDialect.toValue();
      } else if (
        this.unrefractedElement !== null &&
        isStringElement(this.unrefractedElement.get('jsonSchemaDialect'))
      ) {
        jsonSchemaDialect = this.unrefractedElement.get('jsonSchemaDialect').toValue();
      } else {
        jsonSchemaDialect = JsonSchemaDialect.default.toValue();
      }

      return jsonSchemaDialect;
    };

    const handle$schema = (objectElement: ObjectElement) => {
      // handle $schema keyword in embedded resources
      if (isNull(this.parent) && !isStringElement(objectElement.get('$schema'))) {
        // no parent available and no $schema is defined, set default jsonSchemaDialect
        this.element.setMetaProperty('inherited$schema', getJsonSchemaDialect());
      } else if (isSchemaElement(this.parent) && !isStringElement(objectElement.get('$schema'))) {
        // parent is available and no $schema is defined, set parent $schema
        const inherited$schema = defaultTo(
          this.parent.meta.get('inherited$schema')?.toValue(),
          this.parent.$schema?.toValue(),
        );
        this.element.setMetaProperty('inherited$schema', inherited$schema);
      }
    };

    const handle$id = (objectElement: ObjectElement) => {
      // handle $id keyword in embedded resources
      // fetch parent's inherited$id
      const inherited$id =
        this.parent !== null
          ? this.parent.getMetaProperty('inherited$id', []).clone()
          : new ArrayElement();
      // get current $id keyword
      const $id = objectElement.get('$id')?.toValue();

      // remember $id keyword if it's a non empty strings
      if (isNonEmptyString($id)) {
        inherited$id.push($id);
      }

      this.element.setMetaProperty('inherited$id', inherited$id);
    };

    /**
     * Public Api.
     */
    this.ObjectElement = function _ObjectElement(objectElement: ObjectElement) {
      this.element = new SchemaElement();
      handle$schema(objectElement);
      handle$id(objectElement);

      // for further processing consider this Schema Element as parent for all embedded Schema Elements
      this.parent = this.element;
      // @ts-ignore
      return FixedFieldsVisitor.compose.methods.ObjectElement.call(this, objectElement);
    };

    this.BooleanElement = function _BooleanElement(booleanElement: BooleanElement) {
      this.element = booleanElement.clone();
      this.element.classes.push('boolean-json-schema');

      return BREAK;
    };
  },
});

export default SchemaVisitor;
