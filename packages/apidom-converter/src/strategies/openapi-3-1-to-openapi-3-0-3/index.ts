import {
  OpenApi3_0Element,
  mediaTypes as openAPI3_0MediaTypes,
} from '@swagger-api/apidom-ns-openapi-3-0';
import {
  isOpenApi3_1Element,
  mediaTypes as openAPI3_1MediaTypes,
  keyMap,
  getNodeType,
} from '@swagger-api/apidom-ns-openapi-3-1';
import {
  ParseResultElement,
  dispatchRefractorPlugins,
  AnnotationElement,
  cloneDeep,
} from '@swagger-api/apidom-core';

import ConvertStrategy, { IFile } from '../ConvertStrategy';
import openAPIVersionRefractorPlugin from './refractor-plugins/openapi-version';
import webhooksRefractorPlugin from './refractor-plugins/webhooks';
import securitySchemeTypeRefractorPlugin from './refractor-plugins/security-scheme-type';
import securityRequirementsEmptyRolesRefractorPlugin from './refractor-plugins/security-requirements-empty-roles';
import type { ConverterOptions } from '../../options';
import createToolbox from './toolbox';
import infoSummaryRefractorPlugin from './refractor-plugins/info-summary';

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
    const annotations: AnnotationElement[] = [];
    const parseResultElement = dispatchRefractorPlugins(
      cloneDeep(file.parseResult),
      [
        openAPIVersionRefractorPlugin(),
        webhooksRefractorPlugin({ annotations }),
        securitySchemeTypeRefractorPlugin({ annotations }),
        securityRequirementsEmptyRolesRefractorPlugin({ annotations }),
        infoSummaryRefractorPlugin({ annotations }),
      ],
      {
        toolboxCreator: createToolbox,
        visitorOptions: { keyMap, nodeTypeGetter: getNodeType },
      },
    );

    annotations.forEach((a) => parseResultElement.push(a));
    parseResultElement.replaceResult(OpenApi3_0Element.refract(parseResultElement.api));

    return parseResultElement;
  }
}
/* eslint-enable class-methods-use-this */

export default OpenAPI31ToOpenAPI30ConvertStrategy;
