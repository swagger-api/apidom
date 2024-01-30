import {
  OpenApi3_0Element,
  mediaTypes as openAPI3_0MediaTypes,
} from '@swagger-api/apidom-ns-openapi-3-0';
import {
  isOpenApi3_1Element,
  mediaTypes as openAPI3_1MediaTypes,
  createToolbox,
  keyMap,
  getNodeType,
} from '@swagger-api/apidom-ns-openapi-3-1';
import {
  ParseResultElement,
  dispatchRefractorPlugins,
  AnnotationElement,
  cloneShallow,
} from '@swagger-api/apidom-core';

import ConvertStrategy, { IFile } from '../ConvertStrategy';
import openAPIVersionRefractorPlugin from './refractor-plugins/openapi-version';
import webhooksRefractorPlugin from './refractor-plugins/webhooks';
import type { ConverterOptions } from '../../options';

// eslint-disable-next-line @typescript-eslint/naming-convention
const openAPI3_0_3MediaTypes = [
  openAPI3_0MediaTypes.findBy('3.0.3', 'generic'),
  openAPI3_0MediaTypes.findBy('3.0.3', 'json'),
  openAPI3_0MediaTypes.findBy('3.0.3', 'yaml'),
];

/* eslint-disable class-methods-use-this */
class OpenAPI31ToOpenAPI30ConvertStrategy extends ConvertStrategy {
  constructor() {
    super({ name: 'openapi-3-1-to-openapi-3-0-3' });
  }

  canConvert(file: IFile, options: ConverterOptions): boolean {
    let hasRecognizedSourceMediaType = false;
    const hasRecognizedTargetMediaType = openAPI3_0_3MediaTypes.includes(
      options.convert.targetMediaType,
    );

    // source detection
    if (openAPI3_1MediaTypes.includes(options.convert.sourceMediaType)) {
      hasRecognizedSourceMediaType = true;
    } else if (file.mediaType !== 'text/plain') {
      hasRecognizedSourceMediaType = openAPI3_1MediaTypes.includes(file.mediaType);
    } else if (isOpenApi3_1Element(file.parseResult?.result)) {
      hasRecognizedSourceMediaType = true;
    }

    return hasRecognizedSourceMediaType && hasRecognizedTargetMediaType;
  }

  async convert(file: IFile): Promise<ParseResultElement> {
    const parseResultElement = file.parseResult;
    const annotations: AnnotationElement[] = [];
    const converted = dispatchRefractorPlugins(
      parseResultElement,
      [openAPIVersionRefractorPlugin(), webhooksRefractorPlugin({ annotations })],
      {
        toolboxCreator: createToolbox,
        visitorOptions: { keyMap, nodeTypeGetter: getNodeType },
      },
    );

    const annotated = cloneShallow(converted);
    annotations.forEach((a) => annotated.push(a));
    annotated.replaceResult(OpenApi3_0Element.refract(converted.api));

    return annotated;
  }
}
/* eslint-enable class-methods-use-this */

export default OpenAPI31ToOpenAPI30ConvertStrategy;
