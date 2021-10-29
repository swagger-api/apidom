import { createAction, createAsyncThunk } from 'swagger-adjust';

export const setSource = createAction('playground/setSource');

export const setApiDOM = createAction('playground/setApiDOM');

export const setBaseURI = createAction('playground/setBaseURI');

export const setMediaType = createAction('playground/setMediaType');

export const setDereferenced = createAction('playground/setDereferenced');

export const clearConsole = createAction('playground/clearConsole');

export const importURL = createAsyncThunk(
  'playground/importURLStatus',
  async (url, { extra: { apiDOMService } }) => apiDOMService.readFile(url)
);

export const parseSource = createAsyncThunk(
  'playground/parseSourceStatus',
  async ({ source, mediaType }, { extra: { apiDOMService } }) =>
    apiDOMService.parse(source, { mediaType })
);

export const resolveApiDOM = createAsyncThunk(
  'playground/resolveApiDOMStatus',
  async ({ source, apiDOM, mediaType, baseURI }, { extra: { apiDOMService } }) =>
    apiDOMService.resolveApiDOM(apiDOM, { source, mediaType, baseURI })
);

export const interpretApiDOM = createAsyncThunk('interpretApiDOMStatus', async (interpreter) => {
  // pre-defined interpreters
  if (['to-value', 's-expression'].includes(interpreter.toLowerCase())) {
    return interpreter;
  }
  eval(interpreter); // eslint-disable-line no-eval
  return interpreter;
});

export const dereferenceApiDOM = createAsyncThunk(
  'playground/dereferenceApiDOMStatus',
  async ({ source, apiDOM, mediaType, baseURI, interpreter }, { extra: { apiDOMService } }) =>
    apiDOMService.dereferenceApiDOM(apiDOM, { source, mediaType, baseURI, interpreter })
);
