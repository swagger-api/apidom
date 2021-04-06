import reducers, { initialState } from './reducers';
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
import {
  selectSource,
  selectApiDOM,
  selectBaseURI,
  selectMediaType,
  selectConsole,
  selectInterpreter,
  selectDereferenced,
  selectIsLoading,
  selectApiDOMNamespace,
  selectApiDOMInstance,
  selectApiDOMInterpretation,
  selectCanParse,
  selectCanResolve,
  selectCanDereference,
} from './selectors';
import AppBar from './components/AppBar';
import Backdrop from './components/Backdrop';
import Drawer, { drawerWidth } from './components/Drawer';
import DereferenceDialog from './components/DereferenceDialog';
import FileImporter from './components/importer/FileImporter';
import UrlImportDialog from './components/importer/UrlImportDialog';
import LeftPane from './components/left-pane/LeftPane';
import Editor from './components/left-pane/Editor';
import EditorControls from './components/left-pane/EditorControls';
import ApiDOM from './components/right-pane/ApiDOM';
import ApiDOMInterpreterDialog from './components/right-pane/ApiDOMInterpreterDialog';
import Console from './components/right-pane/Console';
import RightPane from './components/right-pane/RightPane';
import Playground from './components/Playground';

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
        humanizeDereferencedApiDOM,
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
        selectIsLoading,
        selectApiDOMNamespace,
        selectApiDOMInstance,
        selectApiDOMInterpretation,
        selectCanParse,
        selectCanResolve,
        selectCanDereference,
      },
    },
  },
});

export default ApiDOMPlaygroundPlugin;
