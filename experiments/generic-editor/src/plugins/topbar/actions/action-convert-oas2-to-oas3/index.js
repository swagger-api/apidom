import { postPerformOasConversion } from '../../../../utils/topbar-http';
import { getSpecVersion } from '../../../../utils/editor-get-spec-version';
import { getConfigsWithDefaultFallback } from './convert-oas2-to-oas3';

export const convertDefinitionToOas3 = () => async (system) => {
  const { specSelectors, specActions } = system;

  const { swagger2ConverterUrl } = getConfigsWithDefaultFallback(system);
  const swagger2editorContent = specSelectors.specStr();

  const conversionResult = await postPerformOasConversion({
    url: swagger2ConverterUrl,
    data: swagger2editorContent,
  });

  if (!conversionResult.error) {
    specActions.updateSpec(conversionResult, 'insert');
    return { data: 'success' };
  }
  return { error: 'unable to convert spec to OAS3' };
};

export const allowConvertDefinitionToOas3 = () => async (system) => {
  const { isSwagger2 } = getSpecVersion(system);
  if (isSwagger2) {
    return true;
  }
  return false;
};

export default { convertDefinitionToOas3, allowConvertDefinitionToOas3 };
