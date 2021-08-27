import {
  instantiateGeneratorClient,
  shouldReInstantiateGeneratorClient,
  downloadGeneratedFile,
  importFromURL,
  clearEditor,
  convertToYaml,
  saveAsJson,
  saveAsYaml,
  saveAsJsonResolved,
  saveAsYamlResolved,
  convertDefinitionToOas3,
  allowConvertDefinitionToOas3,
  getDefinitionLanguageFormat,
  shouldUpdateDefinitionLanguageFormat,
  loadDefaultDefinition,
  handleImportFile,
} from './actions';
import Topbar from './components/Topbar';

export default function topbarPlugin() {
  return {
    statePlugins: {
      topbar: {
        actions: {
          instantiateGeneratorClient,
          shouldReInstantiateGeneratorClient,
          downloadGeneratedFile,
          importFromURL,
          clearEditor,
          convertToYaml,
          saveAsJson,
          saveAsYaml,
          saveAsJsonResolved,
          saveAsYamlResolved,
          convertDefinitionToOas3,
          allowConvertDefinitionToOas3,
          getDefinitionLanguageFormat,
          shouldUpdateDefinitionLanguageFormat,
          loadDefaultDefinition,
          handleImportFile,
        },
      },
    },
    components: {
      Topbar,
    },
  };
}
