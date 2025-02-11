import {
  $defsVisitor as $defsJSONSchema202012Visitor,
  $defsVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-2020-12';

/**
 * @public
 */
export type { $defsVisitorOptions };

/**
 * @public
 */
class $defsVisitor extends $defsJSONSchema202012Visitor {
  constructor(options: $defsVisitorOptions) {
    super(options);
    this.passingOptionsNames.push('parent');
  }
}

export default $defsVisitor;
