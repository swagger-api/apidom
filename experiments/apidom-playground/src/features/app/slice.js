/* eslint-disable camelcase */
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { isNonEmptyString, isEmptyString, isNull } from 'ramda-adjunct';
import { from, traverse, createNamespace } from 'apidom';
import openApi3_1NsPlugin from 'apidom-ns-openapi-3-1';
import asyncApi2_0NsPlugin from 'apidom-ns-asyncapi-2-0';
/* eslint-enable */

const initialState = {
  source: '',
  apiDOM: '',
  baseURI: '',
  mediaType: '',
  console: '',
  interpreter: '',
  dereferenced: '',
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
  selectApiDOM,
  selectMediaType,
  (apiDOM, mediaType) => {
    return isNonEmptyString(apiDOM) && isNonEmptyString(mediaType);
  }
);

export const selectCanDereference = createSelector(
  selectApiDOM,
  selectMediaType,
  (apiDOM, mediaType) => {
    return isNonEmptyString(apiDOM) && isNonEmptyString(mediaType);
  }
);

/**
 * Thunks.
 */

export const importURL = createAsyncThunk(
  'importURLStatus',
  async (url, { extra: { apiDOMService } }) => {
    return apiDOMService.readFile(url);
  }
);

export const parseSource = createAsyncThunk(
  'parseSourceStatus',
  async ({ source, mediaType }, { extra: { apiDOMService } }) => {
    return apiDOMService.parse(source, { mediaType });
  }
);

export const resolveApiDOM = createAsyncThunk(
  'resolveApiDOMStatus',
  async ({ source, apiDOM, mediaType, baseURI }, { extra: { apiDOMService } }) => {
    return apiDOMService.resolveApiDOM(apiDOM, { source, mediaType, baseURI });
  }
);

export const interpretApiDOM = createAsyncThunk('interpretApiDOMStatus', async (interpreter) => {
  eval(interpreter); // eslint-disable-line no-eval
  return interpreter;
});

export const dereferenceApiDOM = createAsyncThunk(
  'dereferenceApiDOMStatus',
  async ({ source, apiDOM, mediaType, baseURI }, { extra: { apiDOMService } }) => {
    return apiDOMService.dereferenceApiDOM(apiDOM, { source, mediaType, baseURI });
  }
);

export const humanizeDereferencedApiDOM = createAsyncThunk(
  'humanizeDereferencedApiDOMStatus',
  async ({ source, mediaType, dereferenced }, { extra: { apiDOMService } }) => {
    return apiDOMService.humanizeDereferenced(dereferenced, { source, mediaType });
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
    setDereferenced(state, action) {
      return { ...state, dereferenced: action.payload };
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
    [interpretApiDOM.fulfilled]: (state, action) => {
      return { ...state, interpreter: action.payload };
    },
    [interpretApiDOM.rejected]: (state, action) => {
      const consoleLines = `${state.console}> ${action.error.message}\n   ${action.error.stack}\n`;

      return { ...state, console: consoleLines };
    },
    [dereferenceApiDOM.pending]: (state) => {
      return { ...state, isLoading: true };
    },
    [dereferenceApiDOM.fulfilled]: (state, action) => {
      return { ...state, dereferenced: action.payload, isLoading: false };
    },
    [dereferenceApiDOM.rejected]: (state, action) => {
      const consoleLines = `${state.console}> ${action.error.message}\n   ${action.error.stack}\n`;

      return { ...state, console: consoleLines, isLoading: false };
    },
    [humanizeDereferencedApiDOM.fulfilled]: (state, action) => {
      return { ...state, dereferenced: action.payload };
    },
  },
});

export const {
  setSource,
  setApiDOM,
  setBaseURI,
  setMediaType,
  setDereferenced,
  clearConsole,
} = appSlice.actions;
export default appSlice.reducer;
