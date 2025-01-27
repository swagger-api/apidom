import {
  DependentSchemasVisitor as DependentSchemaJSONSchema202012Visitor,
  DependentSchemasVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-2020-12';

export type { DependentSchemasVisitorOptions };

/**
 * @public
 */
class DependentSchemasVisitor extends DependentSchemaJSONSchema202012Visitor {
  constructor(options: DependentSchemasVisitorOptions) {
    super(options);
    this.passingOptionsNames.push('parent');
  }
}

export default DependentSchemasVisitor;
