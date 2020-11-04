import stampit from 'stampit';
import { noop } from 'ramda-adjunct';
import { YamlMapping } from 'apidom-ast';

import { BREAK, visit } from '..';
import FixedFieldsYamlMappingVisitor from './FixedFieldsYamlMappingVisitor';
import PatternedFieldsYamlMappingVisitor from './PatternedFieldsYamlMappingVisitor';

const MixedFieldsYamlMappingVisitor = stampit(
  FixedFieldsYamlMappingVisitor,
  PatternedFieldsYamlMappingVisitor,
  {
    props: {
      specPathFixedFields: noop,
      specPathPatternedFields: noop,
    },
    methods: {
      mapping(mappingNode: YamlMapping) {
        const fixedFieldsVisitor = FixedFieldsYamlMappingVisitor({
          ...this.retrievePassingOptions(),
          ignoredFields: this.ignoredFields,
          canSupportSpecificationExtensions: this.canSupportSpecificationExtensions,
          specificationExtensionPredicate: this.specificationExtensionPredicate,
          element: this.element,
          specPath: this.specPathFixedFields,
        });

        visit(mappingNode, fixedFieldsVisitor);

        const patternedFieldsVisitor = PatternedFieldsYamlMappingVisitor({
          ...this.retrievePassingOptions(),
          ignoredFields: this.ignoredFields,
          canSupportSpecificationExtensions: this.canSupportSpecificationExtensions,
          specificationExtensionPredicate: this.specificationExtensionPredicate,
          element: this.element,
          fieldPatternPredicate: this.fieldPatternPredicate,
          specPath: this.specPathPatternedFields,
        });

        visit(mappingNode, patternedFieldsVisitor);

        return BREAK;
      },
    },
  },
);

export default MixedFieldsYamlMappingVisitor;
