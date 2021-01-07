import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { isNonEmptyString } from 'ramda-adjunct';
import { from, dehydrate } from 'apidom';
import ApiDOMParser from 'apidom-parser';
import * as jsonAdapter from 'apidom-parser-adapter-json';
import * as yamlAdapter from 'apidom-parser-adapter-yaml-1-2';
/* eslint-disable camelcase */
import * as openapi3_1AdapterJson from 'apidom-parser-adapter-openapi-json-3-1';
import * as openapi3_1AdapterYaml from 'apidom-parser-adapter-openapi-yaml-3-1';
import * as asyncapi2_0AdapterJson from 'apidom-parser-adapter-asyncapi-json-2-0';
import * as asyncapi2_0AdapterYaml from 'apidom-parser-adapter-asyncapi-yaml-2-0';
/* eslint-enable */
import { readFile, resolveApiDOM as resolveApiDOMReferences } from 'apidom-reference';

const parser = ApiDOMParser()
  .use(jsonAdapter)
  .use(yamlAdapter)
  .use(openapi3_1AdapterJson)
  .use(openapi3_1AdapterYaml)
  .use(asyncapi2_0AdapterJson)
  .use(asyncapi2_0AdapterYaml);

const initialState = {
  source: '',
  apiDOM: '',
  baseURI: '',
  mediaType: '',
  console: '',
  isLoading: false,
};

/**
 * Selectors.
 */

export const selectSource = (state) => state.source;

export const selectApiDOM = (state) => state.apiDOM;

export const selectBaseURI = (state) => state.baseURI;

export const selectMediaType = (state) => state.mediaType;

export const selectConsole = (state) => state.console;

export const selectIsLoading = (state) => state.isLoading;

export const selectCanParse = createSelector(selectSource, selectMediaType, (source, mediaType) => {
  return isNonEmptyString(source) && isNonEmptyString(mediaType);
});

export const selectCanResolve = createSelector(
  selectApiDOM,
  selectMediaType,
  (apiDOM, mediaType) => {
    return isNonEmptyString(apiDOM) && isNonEmptyString(mediaType);
  }
);

/**
 * Thunks.
 */

export const importURL = createAsyncThunk('importURLStatus', async (url) => {
  const buffer = await readFile(url, {});
  return buffer.toString();
});

export const parseSource = createAsyncThunk('parseSourceStatus', async ({ source, mediaType }) => {
  const namespace = parser.findNamespace(source, { sourceMap: true, mediaType });
  const parseResult = await parser.parse(source, { sourceMap: true, mediaType });
  const refract = dehydrate(parseResult, namespace);

  return JSON.stringify(refract, undefined, 2);
});

export const resolveApiDOM = createAsyncThunk(
  'resolveApiDOMStatus',
  async ({ source, apiDOM, mediaType, baseURI }) => {
    const namespace = parser.findNamespace(source, { mediaType });
    const parseResult = from(apiDOM, namespace);

    return resolveApiDOMReferences(parseResult, { parse: { mediaType }, resolve: { baseURI } });
  }
);

/**
 * Slice.
 */

const appSlice = createSlice({
  name: 'apidom-playground',
  initialState,
  reducers: {
    setSource(state, action) {
      return { ...state, source: action.payload };
    },
    setApiDOM(state, action) {
      return { ...state, apiDOM: action.payload };
    },
    setBaseURI(state, action) {
      return { ...state, baseURI: action.payload };
    },
    setMediaType(state, action) {
      return { ...state, mediaType: action.payload };
    },
    clearConsole(state) {
      return { ...state, console: '' };
    },
  },
  extraReducers: {
    [importURL.pending]: (state) => {
      return { ...state, isLoading: true };
    },
    [importURL.fulfilled]: (state, action) => {
      return {
        ...state,
        source: action.payload,
        baseURI: action.meta.arg,
        apiDOM: '',
        isLoading: false,
      };
    },
    [importURL.rejected]: (state, action) => {
      const consoleLines = `${state.console}> ${action.error.message}\n   ${action.error.stack}\n`;

      return { ...state, isLoading: false, console: consoleLines };
    },
    [parseSource.pending]: (state) => {
      return { ...state, isLoading: true };
    },
    [parseSource.fulfilled]: (state, action) => {
      return { ...state, apiDOM: action.payload, isLoading: false };
    },
    [parseSource.rejected]: (state, action) => {
      const consoleLines = `${state.console}> ${action.error.message}\n   ${action.error.stack}\n`;

      return { ...state, isLoading: false, console: consoleLines };
    },
    [resolveApiDOM.pending]: (state) => {
      return { ...state, isLoading: true };
    },
    [resolveApiDOM.fulfilled]: (state, action) => {
      const resolvedFiles = action.payload.refs.reduce((acc, ref, index) => {
        return `${acc}>  External reference #${index}: "${ref.uri}"\n`;
      }, `> Resolved ${action.payload.refs.length} reference(s)\n`);

      return { ...state, console: `${state.console}${resolvedFiles}`, isLoading: false };
    },
    [resolveApiDOM.rejected]: (state, action) => {
      const consoleLines = `${state.console}> ${action.error.message}\n   ${action.error.stack}\n`;

      return { ...state, isLoading: false, console: consoleLines };
    },
  },
});

export const { setSource, setApiDOM, setBaseURI, setMediaType, clearConsole } = appSlice.actions;
export default appSlice.reducer;
