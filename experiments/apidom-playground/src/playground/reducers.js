import {
  setSource,
  setApiDOM,
  setBaseURI,
  setMediaType,
  setDereferenced,
  clearConsole,
  importURL,
  parseSource,
  resolveApiDOM,
  interpretApiDOM,
  dereferenceApiDOM,
  humanizeDereferencedApiDOM,
} from './actions';

export const initialState = {
  source: '',
  apiDOM: '',
  baseURI: '',
  mediaType: '',
  console: '',
  interpreter: '',
  dereferenced: '',
  isLoading: false,
};

const reducers = {
  [setSource]: (state, action) => {
    return { ...state, source: action.payload };
  },
  [setApiDOM]: (state, action) => {
    return { ...state, apiDOM: action.payload };
  },
  [setBaseURI]: (state, action) => {
    return { ...state, baseURI: action.payload };
  },
  [setMediaType]: (state, action) => {
    return { ...state, mediaType: action.payload };
  },
  [setDereferenced]: (state, action) => {
    return { ...state, dereferenced: action.payload };
  },
  [clearConsole]: (state) => {
    return { ...state, console: '' };
  },
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
};

export default reducers;
