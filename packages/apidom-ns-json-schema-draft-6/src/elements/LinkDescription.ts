import { BooleanElement, StringElement } from '@swagger-api/apidom-core';
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

  // @ts-ignore
  get targetSchema(): JSONSchema | BooleanElement | JSONReferenceElement | undefined {
    return this.get('targetSchema');
  }

  // @ts-ignore
  set targetSchema(targetSchema: JSONSchema | BooleanElement | JSONReferenceElement | undefined) {
    this.set('targetSchema', targetSchema);
  }

  // @ts-ignore
  get schema(): JSONSchema | JSONReferenceElement | undefined {
    throw new Error(
      'schema keyword from Hyper-Schema vocabulary has been renamed to submissionSchema.',
    );
  }

  // @ts-ignore
  set schema(schema: JSONSchema | JSONReferenceElement | undefined) {
    throw new Error(
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
    throw new Error('method keyword from Hyper-Schema vocabulary has been removed.');
  }

  set method(method: StringElement | undefined) {
    throw new Error('method keyword from Hyper-Schema vocabulary has been removed.');
  }

  get encType(): StringElement | undefined {
    throw new Error(
      'encType keyword from Hyper-Schema vocabulary has been renamed to submissionEncType.',
    );
  }

  set encType(encType: StringElement | undefined) {
    throw new Error(
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
