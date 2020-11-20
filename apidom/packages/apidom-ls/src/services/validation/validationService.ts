import { Diagnostic, DiagnosticSeverity, Range } from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Element } from 'minim';
import { DefaultJsonSchemaValidationService } from './jsonSchema/jsonSchemaValidationService';
import { getParser } from '../../parserFactory';
import { LanguageSettings, ValidationContext } from '../../apidomLanguageTypes';
import { getSourceMap } from '../../utils/utils';

export interface ValidationService {
  doValidation(
    textDocument: TextDocument,
    validationContext?: ValidationContext,
  ): PromiseLike<Diagnostic[]>;

  configure(settings: LanguageSettings): void;
}

export class DefaultValidationService implements ValidationService {
  private validationEnabled: boolean | undefined;

  private commentSeverity: DiagnosticSeverity | undefined;

  private settings: LanguageSettings | undefined;

  public constructor() {
    this.validationEnabled = true;
    this.commentSeverity = undefined;
  }

  public configure(settings: LanguageSettings): void {
    this.settings = settings;
    if (settings) {
      this.validationEnabled = settings.validate;
      this.commentSeverity = settings.allowComments ? undefined : DiagnosticSeverity.Error;
    }
  }

  public doValidation(
    textDocument: TextDocument,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validationContext?: ValidationContext,
  ): PromiseLike<Diagnostic[]> {
    const parser = getParser(textDocument);
    const text: string = textDocument.getText();
    const diagnostics: Diagnostic[] = [];

    return parser.parse(text, { sourceMap: true }).then((result) => {
      const { api } = result;
      if (!api) {
        return diagnostics;
      }
      api.freeze(); // !! freeze and add parent !!
      if (result.annotations) {
        for (const annotation of result.annotations) {
          const nodeSourceMap = getSourceMap(annotation);
          const location = { offset: nodeSourceMap.offset, length: 1 };
          const range = Range.create(
            textDocument.positionAt(location.offset),
            textDocument.positionAt(location.offset + location.length),
          );
          diagnostics.push(
            Diagnostic.create(range, annotation.toValue(), DiagnosticSeverity.Error, 0),
          );
        }
      }

      this.validate(api, text, !!diagnostics.length, diagnostics);
      return diagnostics;
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public validate(
    node: Element,
    text: string,
    hasSyntaxErrors: boolean,
    validationResult: Diagnostic[],
  ): void {
    if (!this.validationEnabled) {
      // eslint-disable-next-line no-useless-return
      return;
    }
    // TODO https://github.com/swagger-api/oss-planning/issues/226
    // Json schema
    if (!hasSyntaxErrors) {
      // TODO (in validation lib) use the "corrected" serialized APiDOM (without error nodes) so we can check jsonschema also with errors
      const jsonSchemaValidationService = new DefaultJsonSchemaValidationService();
      jsonSchemaValidationService.configure(this.settings);
      jsonSchemaValidationService.validate(text, validationResult);
    }
  }
}
