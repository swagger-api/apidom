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
  AnnotationElement,
  cloneDeep,
  dispatchRefractorPlugins as dispatchPlugins,
} from '@swagger-api/apidom-core';
import { File } from '@swagger-api/apidom-reference';

import ConvertStrategy from '../ConvertStrategy.ts';
import openAPIVersionRefractorPlugin from './refractor-plugins/openapi-version.ts';
import webhooksRefractorPlugin from './refractor-plugins/webhooks.ts';
import securitySchemeTypeRefractorPlugin from './refractor-plugins/security-scheme-type.ts';
import securityRequirementsEmptyRolesRefractorPlugin from './refractor-plugins/security-requirements-empty-roles.ts';
import type { ConverterOptions } from '../../options/index.ts';
import createToolbox from './toolbox.ts';
import infoSummaryRefractorPlugin from './refractor-plugins/info-summary.ts';
import licenseIdentifierRefractorPlugin from './refractor-plugins/license-identifier.ts';
import referenceDescriptionRefractorPlugin from './refractor-plugins/reference-description.ts';
import referenceSummaryRefractorPlugin from './refractor-plugins/reference-summary.ts';

const dispatchPluginsAsync = dispatchPlugins[Symbol.for('nodejs.util.promisify.custom')];

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

  canConvert(file: File, options: ConverterOptions): boolean {
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

  async convert(file: File): Promise<ParseResultElement> {
    const annotations: AnnotationElement[] = [];
    const parseResultElement: ParseResultElement = await dispatchPluginsAsync(
      cloneDeep(file.parseResult!),
      [
        openAPIVersionRefractorPlugin(),
        webhooksRefractorPlugin({ annotations }),
        securitySchemeTypeRefractorPlugin({ annotations }),
        securityRequirementsEmptyRolesRefractorPlugin({ annotations }),
        infoSummaryRefractorPlugin({ annotations }),
        licenseIdentifierRefractorPlugin({ annotations }),
        referenceDescriptionRefractorPlugin({ annotations }),
        referenceSummaryRefractorPlugin({ annotations }),
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
