import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import getOpenAPIRefractor from './get-refractor';
import getPluginsBySpec from './plugins/get-plugins-by-spec';

const convert = async (yaml: string, from: string) => {
  const apiDOM = await parse(yaml);
  const refractor = getOpenAPIRefractor(from);
  const openApiElement = refractor.refract(apiDOM.result, {
    plugins: [...getPluginsBySpec(from)],
  }) as unknown as typeof refractor;
  return openApiElement;
};

export default convert;
