import { CodeAction, Diagnostic, DiagnosticSeverity, Range } from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Element, traverse } from 'apidom';
import { CodeActionParams, CodeActionKind } from 'vscode-languageserver-protocol';

import { getParser, isAsyncDoc, isJsonDoc } from '../../parser-factory';
import { LanguageSettings, ValidationContext } from '../../apidom-language-types';
import {
  setMetadataMap,
  getSourceMap,
  LinterMeta,
  isMember,
  QuickFixData,
  MetadataMap,
} from '../../utils/utils';

export interface ValidationService {
  doValidation(
    textDocument: TextDocument,
    validationContext?: ValidationContext,
  ): Promise<Diagnostic[]>;

  doCodeActions(textDocument: TextDocument, parms: CodeActionParams): Promise<CodeAction[]>;

  configure(settings: LanguageSettings): void;
}

/* represent any validation provider  */
export interface ValidationProvider {
  doValidation(
    textDocument: TextDocument,
    api: Element,
    validationContext?: ValidationContext,
  ): Promise<Diagnostic[]>;

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

  private static getMetadataPropertyLint(doc: Element, metaId: string): LinterMeta[] {
    let meta: LinterMeta[] = [];
    const elementMeta = doc.meta.get('metadataMap')?.get(metaId)?.get('lint')?.toValue();
    if (elementMeta) {
      meta = meta.concat(elementMeta);
    }
    return meta;
  }

  public async doValidation(
    textDocument: TextDocument,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validationContext?: ValidationContext,
  ): Promise<Diagnostic[]> {
    const parser = getParser(textDocument);
    const text: string = textDocument.getText();
    const diagnostics: Diagnostic[] = [];

    const result = await parser.parse(text, { sourceMap: true });
    const { api } = result;

    // no API document has been parsed
    if (api === undefined) return diagnostics;

    // TODO  (francesco@tumanischvili@smartbear.com) use the type related metadata at root level defining the tokenTypes and modifiers
    setMetadataMap(
      api,
      isAsyncDoc(text) ? 'asyncapi' : 'openapi',
      this.settings?.metadata?.metadataMaps,
    ); // TODO (francesco@tumanischvili@smartbear.com)  move to parser/adapter, extending the one standard
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
      // TODO (francesco@tumanischvili@smartbear.com)  try using the "repaired" version of the doc (serialize apidom skipping errors and missing)
      this.jsonSchemaValidationService
        .doValidation(textDocument, api, validationContext)
        .then((jsonSchemaDiagnostics) => {
          diagnostics.push(...jsonSchemaDiagnostics);
        });
    }

    const lint = (element: Element) => {
      const sm = getSourceMap(element);
      if (element.classes) {
        const set: string[] = Array.from(new Set(element.classes.toValue()));
        // add element value to the set (e.g. 'pathItem', 'operation'
        if (!set.includes(element.element)) {
          set.unshift(element.element);
        }
        set.unshift('*');
        set.forEach((s) => {
          // get linter meta from meta
          const linterMeta = DefaultValidationService.getMetadataPropertyLint(api, s);
          if (linterMeta && linterMeta.length > 0) {
            for (const meta of linterMeta) {
              const linterFuncName = meta.linterFunction;
              if (linterFuncName) {
                // call linter function

                const lintFunc = this.settings?.metadata?.linterFunctions[
                  isAsyncDoc(text) ? 'asyncapi' : 'openapi'
                ][linterFuncName];
                if (lintFunc) {
                  try {
                    const lintRes = lintFunc(element);
                    if (!lintRes) {
                      // add to diagnostics
                      let lintSm = sm;
                      if (meta.marker === 'key') {
                        const { parent } = element;
                        if (parent && isMember(parent) && parent.key !== element) {
                          lintSm = getSourceMap(parent.key as Element);
                        }
                      }
                      const location = { offset: lintSm.offset, length: lintSm.length };
                      const range = Range.create(
                        textDocument.positionAt(location.offset),
                        textDocument.positionAt(location.offset + location.length),
                      );
                      const diagnostic = Diagnostic.create(
                        range,
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        meta.message!,
                        meta.severity,
                        meta.code,
                      );
                      diagnostic.source = meta.source;
                      if (meta.data) {
                        diagnostic.data = meta.data;
                      }
                      diagnostics.push(diagnostic);
                    }
                  } catch (e) {
                    // eslint-disable-next-line no-console
                    console.log('validation lint error', JSON.stringify(e), e);
                  }
                }
              }
            }
          }
        });
      }
    };
    traverse(lint, api);
    return diagnostics;
  }

  // try to retrieve data from diagnostic from client, if not present use metadata
  // e.g Monaco doesn't support `data` property
  private findQuickFix(
    diagnostic: Diagnostic,
    lang: string,
    code: string,
  ): QuickFixData | undefined {
    // @ts-ignore
    if (diagnostic.data?.quickFix) {
      // @ts-ignore
      return diagnostic.data?.quickFix;
    }

    if (diagnostic.source === 'LINTER') {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      const map: MetadataMap = this.settings?.metadata?.metadataMaps[lang]!;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [symbolKey, symbolValue] of Object.entries(map)) {
        if (symbolValue.lint) {
          const linters: LinterMeta[] = symbolValue.lint as LinterMeta[];
          for (const linterMeta of linters) {
            // TODO (francesco@tumanischvili@smartbear.com)  solve LinterMeta number/string
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            if (String(linterMeta.code!) === code) {
              return linterMeta.data?.quickFix;
            }
          }
        }
      }
    }
    return undefined;
  }

  // eslint-disable-next-line class-methods-use-this
  public doCodeActions(
    textDocument: TextDocument,
    parmsOrDiagnostics: CodeActionParams | Diagnostic[],
  ): Promise<CodeAction[]> {
    const diagnostics =
      'context' in parmsOrDiagnostics ? parmsOrDiagnostics.context.diagnostics : parmsOrDiagnostics;
    const documentUri =
      'textDocument' in parmsOrDiagnostics ? parmsOrDiagnostics.textDocument.uri : textDocument.uri;
    if (!diagnostics.length) {
      return Promise.resolve([]);
    }
    if (!textDocument) {
      return Promise.resolve([]);
    }

    const parser = getParser(textDocument);
    const text: string = textDocument.getText();

    return parser.parse(text, { sourceMap: true }).then((result) => {
      const { api } = result;
      if (!api) {
        return [];
      }
      api.freeze(); // !! freeze and add parent !!
      const lang = isAsyncDoc(textDocument) ? 'asyncapi' : 'openapi';
      const codeActions: CodeAction[] = [];
      diagnostics.forEach((diag) => {
        const quickFix = this.findQuickFix(diag, lang, String(diag.code));
        if (quickFix)
          if (quickFix.action === 'transformValue') {
            // TODO (francesco@tumanischvili@smartbear.com)  functions as linter from client, defined elsewhere
            if (quickFix.function === 'tranformToLowercase') {
              codeActions.push({
                // @ts-ignore
                title: quickFix.message,
                kind: CodeActionKind.QuickFix,
                diagnostics: [diag],
                edit: {
                  changes: {
                    [documentUri]: [
                      {
                        range: diag.range,
                        newText: textDocument.getText(diag.range).toLowerCase(),
                      },
                    ],
                  },
                },
              });
            }
          } else if (quickFix.action === 'addChild') {
            // TODO (francesco@tumanischvili@smartbear.com)  functions as linter from client, defined elsewhere
            // if (quickFix.function === 'addDescription') {
            // TODO (francesco@tumanischvili@smartbear.com)  use apidom node to add a child  whenroundtrip serialization gets supported
            const newText = isJsonDoc(text) ? quickFix.snippetJson : quickFix.snippetYaml;

            // get the range of 0 length for the same line + 1
            const line = diag.range.start.line + 1;
            // get the char with indent
            // TODO (francesco@tumanischvili@smartbear.com)  better indent handling
            const character = diag.range.start.character + 2;
            const range = Range.create({ line, character }, { line, character });
            // TODO (francesco@tumanischvili@smartbear.com)  caret is not moved to $1 like in completion, use a command or something
            codeActions.push({
              // @ts-ignore
              title: quickFix.message,
              kind: CodeActionKind.QuickFix,
              diagnostics: [diag],
              edit: {
                changes: {
                  [documentUri]: [
                    {
                      range,
                      newText: newText || '',
                    },
                  ],
                },
              },
            });
          }
      });

      return codeActions;
    });
  }
}
