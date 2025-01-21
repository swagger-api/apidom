import { BooleanElement } from '@swagger-api/apidom-core';
import { LinkDescriptionElement } from '@swagger-api/apidom-ns-json-schema-draft-7';

import JSONSchema from './JSONSchema.ts';

/* eslint-disable class-methods-use-this */

/**
 * URI: https://json-schema.org/draft/2019-09/draft-handrews-json-schema-hyperschema-02#rfc.section.6
 * @public
 */

class LinkDescription extends LinkDescriptionElement {
  /**
   *  Link Target Attributes.
   *
   *  URI: https://json-schema.org/draft/2019-09/draft-handrews-json-schema-hyperschema-02#rfc.section.6.5
   */
  get targetSchema(): JSONSchema | BooleanElement | undefined {
    return this.get('targetSchema');
  }

  set targetSchema(targetSchema: JSONSchema | BooleanElement | undefined) {
    this.set('targetSchema', targetSchema);
  }

  /**
   *  Link Input.
   *
   *  URI: https://json-schema.org/draft/2019-09/draft-handrews-json-schema-hyperschema-02#input
   */
  get hrefSchema(): JSONSchema | BooleanElement | undefined {
    return this.get('hrefSchema');
  }

  set hrefSchema(hrefSchema: JSONSchema | BooleanElement | undefined) {
    this.set('hrefSchema', hrefSchema);
  }

  get headerSchema(): JSONSchema | BooleanElement | undefined {
    return this.get('headerSchema');
  }

  set headerSchema(headerSchema: JSONSchema | BooleanElement | undefined) {
    this.set('headerSchema', headerSchema);
  }

  get submissionSchema(): JSONSchema | BooleanElement | undefined {
    return this.get('submissionSchema');
  }

  set submissionSchema(submissionSchema: JSONSchema | BooleanElement | undefined) {
    this.set('submissionSchema', submissionSchema);
  }
}

export default LinkDescription;
