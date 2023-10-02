import { Diagnostic, DiagnosticSeverity, Range } from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Element, toValue } from '@swagger-api/apidom-core';
import { OpenApi3_1Element } from '@swagger-api/apidom-ns-openapi-3-1';
import {
  MainElement,
  refractPluginOpenApi3_1StandardIdentifierAccessors,
  refractPluginOpenApi3_1StandardIdentifierSelectors,
  validateOpenAPI3_1,
} from '@swagger-api/apidom-ns-api-design-systems';
import { parse as parseYAML } from '@swagger-api/apidom-parser-adapter-yaml-1-2';
import { parse as parseJSON } from '@swagger-api/apidom-parser-adapter-json';

import {
  LanguageSettings,
  MergeStrategy,
  NamespaceVersion,
  ValidationContext,
  ValidationProvider,
  ValidationProviderResult,
} from '../../../apidom-language-types';
import { isJsonDoc, getSourceMap } from '../../../utils/utils';

// eslint-disable-next-line import/prefer-default-export
export class AdsValidationProvider implements ValidationProvider {
  private validationEnabled: boolean | undefined;

  protected adsDoc: string;

  private ignoreResult: ValidationProviderResult = {
    mergeStrategy: MergeStrategy.IGNORE,
    diagnostics: [],
  };

  public constructor(adsDoc: string) {
    this.validationEnabled = true;
    this.adsDoc = adsDoc;
  }

  public updateAdsDoc(adsDoc: string) {
    this.adsDoc = adsDoc;
  }

  public async doValidation(
    textDocument: TextDocument,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    api: Element,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    currentDiagnostics: Diagnostic[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validationContext?: ValidationContext,
  ): Promise<ValidationProviderResult> {
    if (!this.adsDoc) {
      return this.ignoreResult;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const text = textDocument.getText();
    const isOasJson = await isJsonDoc(textDocument);
    const isAdsJson = await isJsonDoc(this.adsDoc);
    try {
      const apiDesignSystemsParseResult = isAdsJson
        ? await parseJSON(this.adsDoc)
        : await parseYAML(this.adsDoc);
      const openAPIParseResult = isOasJson
        ? await parseJSON(text, { sourceMap: true })
        : await parseYAML(text, { sourceMap: true });
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
      const diagnostics: Diagnostic[] = [];
      for (const annotation of annotations) {
        const nodeSourceMap = getSourceMap(annotation);
        const location = { offset: nodeSourceMap.offset, length: nodeSourceMap.length };
        const range = Range.create(
          textDocument.positionAt(location.offset),
          textDocument.positionAt(location.offset + location.length),
        );
        const diagnostic = Diagnostic.create(
          range,
          toValue(annotation),
          DiagnosticSeverity.Error,
          0,
          'syntax',
        );
        diagnostics.push(diagnostic);
      }
      return {
        mergeStrategy: MergeStrategy.PREPEND,
        diagnostics,
      };
    } catch (e) {
      return this.ignoreResult;
    }
  }

  public configure(settings?: LanguageSettings): void {
    if (settings) {
      this.validationEnabled = settings.validate;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  break(): boolean {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  namespaces(): NamespaceVersion[] {
    return [
      { namespace: 'openapi', version: '3.1.0' },
      { namespace: 'openapi', version: '3.0.0' },
    ];
  }

  // eslint-disable-next-line class-methods-use-this
  name(): string {
    return 'ads';
  }
}
