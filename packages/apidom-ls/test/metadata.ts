import { isObjectElement, isStringElement } from '@swagger-api/apidom-core';
import { Element, ObjectElement } from 'minim';
import fs from 'fs';
import path from 'path';

import { MetadataMap, Metadata, LinterFunctions } from '../src/utils/utils';

/* METADATA */

const metadataMapOpenapi: MetadataMap = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'fixtures', 'metadata/metadataMapOpenapi.json')).toString(),
);

const metadataMapAsyncapi: MetadataMap = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'fixtures', 'metadata/metadataMapAsyncapi.json')).toString(),
);

/* LINT FUNCTIONS */

export const infoLinter = (element: Element): boolean => {
  if (element && isObjectElement(element) && element.element === 'info') {
    if (!(element as ObjectElement).get('description')) {
      return false;
    }
  }
  return true;
};

export const noUpperCaseLinter = (element: Element): boolean => {
  if (element && isStringElement(element)) {
    const re = /"/gi;
    if (
      String(element.toValue())
        .replace(re, '')
        .match(/^[A-Z]*$/)
    ) {
      return false;
    }
  }
  return true;
};

/* LINT FUNCTIONS META */

export const linterFunctionsOpenapi: LinterFunctions = {
  infoLinter,
  noUpperCaseLinter,
};

export const linterFunctionsAsyncapi: LinterFunctions = {
  infoLinter,
  noUpperCaseLinter,
};

/* METADATA */

export function metadata(): Metadata {
  return {
    metadataMaps: {
      openapi: metadataMapOpenapi,
      asyncapi: metadataMapAsyncapi,
    },
    linterFunctions: {
      openapi: linterFunctionsOpenapi,
      asyncapi: linterFunctionsAsyncapi,
    },
  };
}
