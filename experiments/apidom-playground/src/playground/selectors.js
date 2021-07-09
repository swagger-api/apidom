import { createSelector } from 'swagger-adjust';
import { isEmptyString, isNonEmptyString, isNull } from 'ramda-adjunct';
import { from, traverse, createNamespace, sexprs, toValue } from 'apidom';
/* eslint-disable camelcase */
import openApi3_1NsPlugin from 'apidom-ns-openapi-3-1';
import asyncApi2_0NsPlugin from 'apidom-ns-asyncapi-2-0';
/* eslint-enable */

export const selectSource = (state) => state.source;

export const selectApiDOM = (state) => state.apiDOM;

export const selectBaseURI = (state) => state.baseURI;

export const selectMediaType = (state) => state.mediaType;

export const selectConsole = (state) => state.console;

export const selectInterpreter = (state) => state.interpreter;

export const selectDereferenced = (state) => state.dereferenced;

export const selectIsLoading = (state) => state.isLoading;

export const selectApiDOMNamespace = createSelector(selectMediaType, (mediaType) => {
  if (isEmptyString(mediaType)) {
    return null;
  }
  if (mediaType.includes('vnd.oai.openapi')) {
    return createNamespace(openApi3_1NsPlugin);
  }
  if (mediaType.includes('vnd.aai.asyncapi')) {
    return createNamespace(asyncApi2_0NsPlugin);
  }
  return createNamespace();
});

export const selectApiDOMInstance = createSelector(
  selectSource,
  selectApiDOM,
  selectApiDOMNamespace,
  (source, apiDOM, namespace) => {
    if (isEmptyString(source) || isEmptyString(apiDOM) || isNull(namespace)) {
      return null;
    }

    return from(apiDOM, namespace);
  }
);

export const selectApiDOMInterpretation = createSelector(
  selectApiDOMInstance,
  selectApiDOM,
  selectInterpreter,

  (element, apiDOM, interpreter) => {
    if (element === null || isEmptyString(interpreter)) {
      return apiDOM;
    }

    // pre-defined interpreters
    if (interpreter.toLowerCase() === 's-expression') {
      return sexprs(element);
    }
    if (interpreter.toLowerCase() === 'to-value') {
      return JSON.stringify(toValue(element), null, 2);
    }

    const callback = eval(interpreter); // eslint-disable-line no-eval
    let result = '';
    traverse((el) => {
      result += callback(el);
    }, element);

    return result;
  }
);

export const selectCanParse = createSelector(selectSource, selectMediaType, (source, mediaType) => {
  return isNonEmptyString(source) && isNonEmptyString(mediaType);
});

export const selectCanResolve = createSelector(
  selectBaseURI,
  selectApiDOM,
  selectMediaType,
  (baseURI, apiDOM, mediaType) => {
    return isNonEmptyString(baseURI) && isNonEmptyString(apiDOM) && isNonEmptyString(mediaType);
  }
);

export const selectCanDereference = createSelector(
  selectBaseURI,
  selectApiDOM,
  selectMediaType,
  (baseURI, apiDOM, mediaType) => {
    return isNonEmptyString(baseURI) && isNonEmptyString(apiDOM) && isNonEmptyString(mediaType);
  }
);
