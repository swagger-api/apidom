import { Element } from '@swagger-api/apidom-core';

import configAsyncapi from './asyncapi/config';
import configOpenapi from './openapi/config';
import configAds from './ads/config';
import { isObject, isString } from '../utils/utils';
import { Metadata } from '../apidom-language-types';
/* METADATA */

/* LINT FUNCTIONS */

export const infoLinter = (element: Element) => {
  if (element && isObject(element) && element.element === 'info') {
    if (!element.get('description')) {
      return false;
    }
  }
  return true;
};

export const contactLinter = (element: Element) => {
  if (element && isObject(element) && element.element === 'contact') {
    if (!element.get('name')) {
      return false;
    }
  }
  return true;
};

export const xLinter = (element: Element) => {
  if (element && isObject(element) && element.element === 'contact') {
    if (!element.get('x-smartbear-team')) {
      return false;
    }
  }
  return true;
};

export const noUpperCaseLinter = (element: Element) => {
  if (element && isString(element)) {
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

export const pascalCaseLinter = (element: Element) => {
  if (element && isString(element)) {
    const re = /"/gi;
    if (
      !String(element.toValue())
        .replace(re, '')
        .match(/^[a-z]+((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?$/)
    ) {
      return false;
    }
  }
  return true;
};

/* LINT FUNCTIONS META */

export const linterFunctionsOpenapi = {
  infoLinter,
  noUpperCaseLinter,
  // pascalCaseLinter,
  contactLinter,
  xLinter,
};

export const linterFunctionsAsyncapi = {
  infoLinter,
  noUpperCaseLinter,
  contactLinter,
  // pascalCaseLinter,
  xLinter,
};

export function config(): Metadata {
  return {
    metadataMaps: {
      openapi: configOpenapi,
      asyncapi: configAsyncapi,
      ads: configAds,
    },
    linterFunctions: {
      openapi: linterFunctionsOpenapi,
      asyncapi: linterFunctionsAsyncapi,
      ads: linterFunctionsAsyncapi,
    },
  } as Metadata;
}
