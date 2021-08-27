import { defaultFixtures } from './fixtures.actions';
import { postPerformOasConversion } from '../../../utils/topbar-http';
import { getSpecVersion } from '../../../utils/editor-get-spec-version';

// currently re-used
const getConfigsWithDefaultFallback = (system) => {
  let { swagger2GeneratorUrl, oas3GeneratorUrl, swagger2ConverterUrl } = system.getConfigs();
  if (!swagger2GeneratorUrl) {
    swagger2GeneratorUrl = defaultFixtures.swagger2GeneratorUrl;
  }
  if (!oas3GeneratorUrl) {
    oas3GeneratorUrl = defaultFixtures.oas3GeneratorUrl;
  }
  if (!swagger2ConverterUrl) {
    swagger2ConverterUrl = defaultFixtures.swagger2ConverterUrl;
  }
  return { swagger2GeneratorUrl, oas3GeneratorUrl, swagger2ConverterUrl };
};

export const convertDefinitionToOas3 = () => async (system) => {
  const { specSelectors, specActions } = system;

  const { swagger2ConverterUrl } = getConfigsWithDefaultFallback(system);
  const swagger2editorContent = specSelectors.specStr();

  // eslint-disable-next-line no-unused-vars
  // const mockOptions = {
  //   swagger2editorContent: mockOas2Spec,
  // };
  const conversionResult = await postPerformOasConversion({
    url: swagger2ConverterUrl,
    data: swagger2editorContent,
  });
  // console.log('conversionResult:', conversionResult);
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
