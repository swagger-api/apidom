import { Diagnostic, DiagnosticSeverity, Range } from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Element } from 'apidom';
import { getParser } from '../../parser-factory';
import { LanguageSettings, ValidationContext } from '../../apidom-language-types';
import { getSourceMap } from '../../utils/utils';

/* represent the service invoked by LSP server - TODO */
export interface ValidationService {
  doValidation(
    textDocument: TextDocument,
    validationContext?: ValidationContext,
  ): PromiseLike<Diagnostic[]>;

  configure(settings: LanguageSettings): void;
}

/* represent any validation provider - TODO */
export interface ValidationProvider {
  doValidation(
    textDocument: TextDocument,
    api: Element,
    validationContext?: ValidationContext,
  ): PromiseLike<Diagnostic[]>;

  configure(settings: LanguageSettings): void;
}

export class DefaultValidationService implements ValidationService {
  private validationEnabled: boolean | undefined;

  private commentSeverity: DiagnosticSeverity | undefined;

  private settings: LanguageSettings | undefined;

  private jsonSchemaValidationService: ValidationProvider;

  public constructor(jsonSchemaValidationService: ValidationProvider) {
    this.validationEnabled = true;
    this.commentSeverity = undefined;
    this.jsonSchemaValidationService = jsonSchemaValidationService;
  }

  public configure(settings?: LanguageSettings): void {
    this.settings = settings;
    if (settings) {
      this.jsonSchemaValidationService.configure(settings);
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
          if (
            validationContext &&
            validationContext.maxNumberOfProblems &&
            diagnostics.length > validationContext.maxNumberOfProblems
          ) {
            return diagnostics;
          }
          const nodeSourceMap = getSourceMap(annotation);
          const location = { offset: nodeSourceMap.offset, length: 1 };
          const range = Range.create(
            textDocument.positionAt(location.offset),
            textDocument.positionAt(location.offset + location.length),
          );
          const diagnostic = Diagnostic.create(
            range,
            annotation.toValue(),
            DiagnosticSeverity.Error,
            0,
          );
          if (validationContext && validationContext.relatedInformation) {
            diagnostic.relatedInformation = [
              {
                location: {
                  uri: textDocument.uri,
                  range: { ...diagnostic.range },
                },
                message: 'Syntax error while parsing',
              },
              {
                location: {
                  uri: textDocument.uri,
                  range: { ...diagnostic.range },
                },
                message: 'more things',
              },
            ];
          }

          diagnostics.push(diagnostic);
        }
      }
      const hasSyntaxErrors = !!diagnostics.length;
      if (!hasSyntaxErrors) {
        // TODO try using the "repaired" version of the doc (serialize apidom skipping errors and missing)
        this.jsonSchemaValidationService
          .doValidation(textDocument, api, validationContext)
          .then((jsonSchemaDiagnostics) => {
            diagnostics.push(...jsonSchemaDiagnostics);
          });
      }
      return diagnostics;
    });
  }
}
