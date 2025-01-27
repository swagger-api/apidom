import {
  PropertiesVisitor as PropertiesJSONSchema202012Visitor,
  PropertiesVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-2020-12';

export type { PropertiesVisitorOptions };

/**
 * @public
 */
class PropertiesVisitor extends PropertiesJSONSchema202012Visitor {
  constructor(options: PropertiesVisitorOptions) {
    super(options);
    this.passingOptionsNames.push('parent');
  }
}

export default PropertiesVisitor;
