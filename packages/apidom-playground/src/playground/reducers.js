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
} from './actions.js';

export const initialState = {
  source: '',
  apiDOM: '',
  baseURI: '',
  mediaType: '',
  console: '',
  interpreter: '',
  dereferenced: '',
  dereferencedInterpreter: 'dehydrate',
  isLoading: false,
};

const reducers = {
  [setSource]: (state, action) => ({ ...state, source: action.payload }),
  [setApiDOM]: (state, action) => ({ ...state, apiDOM: action.payload }),
  [setBaseURI]: (state, action) => ({ ...state, baseURI: action.payload }),
  [setMediaType]: (state, action) => ({ ...state, mediaType: action.payload }),
  [setDereferenced]: (state, action) => ({ ...state, dereferenced: action.payload }),
  [clearConsole]: (state) => ({ ...state, console: '' }),
  [importURL.pending]: (state) => ({ ...state, isLoading: true }),
  [importURL.fulfilled]: (state, action) => ({
    ...state,
    source: action.payload,
    baseURI: action.meta.arg,
    apiDOM: '',
    isLoading: false,
  }),
  [importURL.rejected]: (state, action) => {
    const consoleLines = `${state.console}> ${action.error.message}\n   ${action.error.stack}\n`;

    return { ...state, isLoading: false, console: consoleLines };
  },
  [parseSource.pending]: (state) => ({ ...state, isLoading: true }),
  [parseSource.fulfilled]: (state, action) => ({
    ...state,
    apiDOM: action.payload,
    isLoading: false,
  }),
  [parseSource.rejected]: (state, action) => {
    const consoleLines = `${state.console}> ${action.error.message}\n   ${action.error.stack}\n`;

    return { ...state, isLoading: false, console: consoleLines };
  },
  [resolveApiDOM.pending]: (state) => ({ ...state, isLoading: true }),
  [resolveApiDOM.fulfilled]: (state, action) => {
    const resolvedFiles = action.payload.refs.reduce(
      (acc, ref, index) => `${acc}>  External reference #${index}: "${ref.uri}"\n`,
      `> Resolved ${action.payload.refs.length} reference(s)\n`
    );

    return { ...state, console: `${state.console}${resolvedFiles}`, isLoading: false };
  },
  [resolveApiDOM.rejected]: (state, action) => {
    const consoleLines = `${state.console}> ${action.error.message}\n   ${action.error.stack}\n`;

    return { ...state, isLoading: false, console: consoleLines };
  },
  [interpretApiDOM.fulfilled]: (state, action) => ({ ...state, interpreter: action.payload }),
  [interpretApiDOM.rejected]: (state, action) => {
    const consoleLines = `${state.console}> ${action.error.message}\n   ${action.error.stack}\n`;

    return { ...state, console: consoleLines };
  },
  [dereferenceApiDOM.pending]: (state) => ({ ...state, isLoading: true }),
  [dereferenceApiDOM.fulfilled]: (state, action) => {
    const { dereferenced, interpreter } = action.payload;

    return { ...state, dereferenced, dereferencedInterpreter: interpreter, isLoading: false };
  },
  [dereferenceApiDOM.rejected]: (state, action) => {
    const consoleLines = `${state.console}> ${action.error.message}\n   ${action.error.stack}\n`;

    return { ...state, console: consoleLines, isLoading: false };
  },
};

export default reducers;
