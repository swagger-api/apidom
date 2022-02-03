import reducers, { initialState } from './reducers.js';
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
import {
  selectSource,
  selectApiDOM,
  selectBaseURI,
  selectMediaType,
  selectConsole,
  selectInterpreter,
  selectDereferenced,
  selectDereferencedInterpreter,
  selectIsLoading,
  selectApiDOMNamespace,
  selectApiDOMInstance,
  selectApiDOMInterpretation,
  selectCanParse,
  selectCanResolve,
  selectCanDereference,
  selectMediaTypes,
} from './selectors.js';
import AppBar from './components/AppBar.jsx';
import Backdrop from './components/Backdrop.jsx';
import Drawer, { drawerWidth } from './components/Drawer.jsx';
import DereferenceDialog from './components/DereferenceDialog.jsx';
import FileImporter from './components/importer/FileImporter.jsx';
import UrlImportDialog from './components/importer/UrlImportDialog.jsx';
import LeftPane from './components/left-pane/LeftPane.jsx';
import Editor from './components/left-pane/Editor.jsx';
import EditorControls from './components/left-pane/EditorControls.jsx';
import ApiDOM from './components/right-pane/ApiDOM.jsx';
import ApiDOMInterpreterDialog from './components/right-pane/ApiDOMInterpreterDialog.jsx';
import Console from './components/right-pane/Console.jsx';
import RightPane from './components/right-pane/RightPane.jsx';
import Playground from './components/Playground.jsx';

const ApiDOMPlaygroundPlugin = () => ({
  rootInjects: {
    drawerWidth,
  },
  components: {
    AppBar,
    Backdrop,
    Drawer,
    DereferenceDialog,
    FileImporter,
    UrlImportDialog,
    LeftPane,
    Editor,
    EditorControls,
    ApiDOM,
    ApiDOMInterpreterDialog,
    Console,
    RightPane,
    Playground,
  },
  statePlugins: {
    playground: {
      initialState,
      actions: {
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
      },
      reducers,
      selectors: {
        selectSource,
        selectApiDOM,
        selectBaseURI,
        selectMediaType,
        selectConsole,
        selectInterpreter,
        selectDereferenced,
        selectDereferencedInterpreter,
        selectIsLoading,
        selectApiDOMNamespace,
        selectApiDOMInstance,
        selectApiDOMInterpretation,
        selectCanParse,
        selectCanResolve,
        selectCanDereference,
        selectMediaTypes,
      },
    },
  },
});

export default ApiDOMPlaygroundPlugin;
