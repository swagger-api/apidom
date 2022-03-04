import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { AnnotationElement } from '@swagger-api/apidom-core';
import { parse as parseJSON } from '@swagger-api/apidom-parser-adapter-json';
import { parse as parseYAML } from '@swagger-api/apidom-parser-adapter-yaml-1-2';
import { OpenApi3_1Element } from '@swagger-api/apidom-ns-openapi-3-1';

import {
  refractPluginOpenApi3_1StandardIdentifierSelectors,
  refractPluginOpenApi3_1StandardIdentifierAccessors,
  MainElement,
  validateOpenAPI3_1,
} from '../../../../../src';

const apiDesignSystemsDefinition = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'api-design-systems.yaml'))
  .toString();
const openAPIDefinition = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'openapi-3-1.json'))
  .toString();

describe('given API Design Systems and OpenAPI 3.1 definitions', function () {
  let openapiElement: any;
  let mainElement: any;

  beforeEach(async function () {
    const apiDesignSystemsParseResult = await parseYAML(apiDesignSystemsDefinition);
    const openAPIParseResult = await parseJSON(openAPIDefinition, { sourceMap: true });

    mainElement = MainElement.refract(apiDesignSystemsParseResult.result);
    openapiElement = OpenApi3_1Element.refract(openAPIParseResult.result, {
      plugins: [
        refractPluginOpenApi3_1StandardIdentifierSelectors(),
        refractPluginOpenApi3_1StandardIdentifierAccessors(),
      ],
    });
  });

  it('should not produce annotation for post requests', function () {
    const annotations = validateOpenAPI3_1(mainElement, openapiElement);

    assert.lengthOf(annotations, 2);
  });

  it('should produce annotation about 201 status code', function () {
    const annotations = validateOpenAPI3_1(mainElement, openapiElement);
    const statusCodeAnnotation = annotations.find((annotation: AnnotationElement) => {
      return (
        annotation.toValue() ===
        '"201" not allowed for subject ["http","response","status_code"] on line 7, column 10'
      );
    });

    assert.isTrue(statusCodeAnnotation instanceof AnnotationElement);
  });

  it('should produce annotation about 305 status code', function () {
    const annotations = validateOpenAPI3_1(mainElement, openapiElement);
    const statusCodeAnnotation = annotations.find((annotation: AnnotationElement) => {
      return (
        annotation.toValue() ===
        '"305" not allowed for subject ["http","response","status_code"] on line 8, column 10'
      );
    });

    assert.isTrue(statusCodeAnnotation instanceof AnnotationElement);
  });
});
