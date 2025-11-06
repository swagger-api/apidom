import { SchemaElement } from '@swagger-api/apidom-ns-asyncapi-2';
import ExternalDocumentationElement from './ExternalDocumentation.ts';
import ReferenceElement from './Reference.ts';

/**
 * @public
 */
class Schema extends SchemaElement {

	get externalDocs(): ExternalDocumentationElement | ReferenceElement | undefined | any {
    return this.get('externalDocs');
  }

  set externalDocs(externalDocs: ExternalDocumentationElement | ReferenceElement | undefined | any) {
    this.set('externalDocs', externalDocs);
  }
}

export default Schema;
