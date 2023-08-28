import { BooleanElement, StringElement } from '@swagger-api/apidom-core';
import { UnsupportedOperationError } from '@swagger-api/apidom-error';
import {
  LinkDescriptionElement,
  JSONReferenceElement,
} from '@swagger-api/apidom-ns-json-schema-draft-4';

import JSONSchema from './JSONSchema';

/* eslint-disable class-methods-use-this */

/**
 * URI: https://datatracker.ietf.org/doc/html/draft-wright-json-schema-hyperschema-01#section-6
 */

class LinkDescription extends LinkDescriptionElement {
  get hrefSchema(): JSONSchema | BooleanElement | JSONReferenceElement | undefined {
    return this.get('hrefSchema');
  }

  set hrefSchema(hrefSchema: JSONSchema | BooleanElement | JSONReferenceElement | undefined) {
    this.set('hrefSchema', hrefSchema);
  }

  get targetSchema(): JSONSchema | BooleanElement | JSONReferenceElement | undefined | any {
    return this.get('targetSchema');
  }

  set targetSchema(
    targetSchema: JSONSchema | BooleanElement | JSONReferenceElement | undefined | any,
  ) {
    this.set('targetSchema', targetSchema);
  }

  get schema(): JSONSchema | JSONReferenceElement | undefined {
    throw new UnsupportedOperationError(
      'schema keyword from Hyper-Schema vocabulary has been renamed to submissionSchema.',
    );
  }

  set schema(schema: JSONSchema | JSONReferenceElement | undefined) {
    throw new UnsupportedOperationError(
      'schema keyword from Hyper-Schema vocabulary has been renamed to submissionSchema.',
    );
  }

  get submissionSchema(): JSONSchema | BooleanElement | JSONReferenceElement | undefined {
    return this.get('submissionSchema');
  }

  set submissionSchema(
    submissionSchema: JSONSchema | BooleanElement | JSONReferenceElement | undefined,
  ) {
    this.set('submissionSchema', submissionSchema);
  }

  get method(): StringElement | undefined {
    throw new UnsupportedOperationError(
      'method keyword from Hyper-Schema vocabulary has been removed.',
    );
  }

  set method(method: StringElement | undefined) {
    throw new UnsupportedOperationError(
      'method keyword from Hyper-Schema vocabulary has been removed.',
    );
  }

  get encType(): StringElement | undefined {
    throw new UnsupportedOperationError(
      'encType keyword from Hyper-Schema vocabulary has been renamed to submissionEncType.',
    );
  }

  set encType(encType: StringElement | undefined) {
    throw new UnsupportedOperationError(
      'encType keyword from Hyper-Schema vocabulary has been renamed to submissionEncType.',
    );
  }

  get submissionEncType(): StringElement | undefined {
    return this.get('submissionEncType');
  }

  set submissionEncType(submissionEncType: StringElement | undefined) {
    this.set('submissionEncType', submissionEncType);
  }
}

export default LinkDescription;
