import fs from 'fs';
import path from 'path';
import { parse as parseJSON } from '@swagger-api/apidom-parser-adapter-json';
import { parse as parseYAML } from '@swagger-api/apidom-parser-adapter-yaml-1-2';
import {
  refractPluginOpenApi3_1StandardIdentifierSelectors,
  refractPluginOpenApi3_1StandardIdentifierAccessors,
  MainElement,
  validateOpenAPI3_1,
} from '@swagger-api/apidom-ns-api-design-systems';
import { OpenApi3_1Element } from '@swagger-api/apidom-ns-openapi-3-1';

const adsLint = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'ads', 'ads-validator.yaml'))
  .toString();
const oasLint = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'ads', 'openapi-3-1.json'))
  .toString();

describe('oas ads test', function () {
  it('lint oas', async function () {
    const apiDesignSystemsParseResult = await parseYAML(adsLint);
    const openAPIParseResult = await parseJSON(oasLint, { sourceMap: true });
    const mainElement = MainElement.refract(apiDesignSystemsParseResult.result);
    const openapiElement = OpenApi3_1Element.refract(openAPIParseResult.result, {
      plugins: [
        refractPluginOpenApi3_1StandardIdentifierSelectors(),
        refractPluginOpenApi3_1StandardIdentifierAccessors(),
      ],
    });
    const annotations = validateOpenAPI3_1(
      mainElement as MainElement,
      openapiElement as OpenApi3_1Element,
    );

    console.log('ADS ANNOTATIONS', JSON.stringify(annotations, null, 2));
  });
});
