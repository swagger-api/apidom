import { CodeAction, Diagnostic, DiagnosticSeverity, Range } from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Element, findAtOffset, traverse } from '@swagger-api/apidom-core';
import { CodeActionParams, CodeActionKind } from 'vscode-languageserver-protocol';

import { isAsyncDoc, isJsonDoc } from '../../parser-factory';
import {
  APIDOM_LINTER,
  LanguageSettings,
  ValidationContext,
  ValidationProvider,
  LinterMeta,
  QuickFixData,
  MetadataMap,
} from '../../apidom-language-types';
import { getSourceMap, isMember, isObject, getSpecVersion } from '../../utils/utils';
import { standardLinterfunctions } from './linter-functions';

export interface ValidationService {
  doValidation(
    textDocument: TextDocument,
    validationContext?: ValidationContext,
  ): Promise<Diagnostic[]>;

  doCodeActions(textDocument: TextDocument, parms: CodeActionParams): Promise<CodeAction[]>;

  configure(settings: LanguageSettings): void;

  registerProvider(provider: ValidationProvider): void;
}

export class DefaultValidationService implements ValidationService {
  private validationEnabled: boolean | undefined;

  private commentSeverity: DiagnosticSeverity | undefined;

  private settings: LanguageSettings | undefined;

  private validationProviders: ValidationProvider[] = [];

  public constructor() {
    this.validationEnabled = true;
    this.commentSeverity = undefined;
  }

  public registerProvider(provider: ValidationProvider): void {
    this.validationProviders.push(provider);
    if (this.settings) {
      provider.configure(this.settings);
    }
  }

  public configure(settings?: LanguageSettings): void {
    this.settings = settings;
    if (settings) {
      if (settings.validatorProviders) {
        this.validationProviders = settings.validatorProviders;
      }
      for (const provider of this.validationProviders) {
        provider.configure(settings);
      }
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
    const text: string = textDocument.getText();
    const diagnostics: Diagnostic[] = [];

    const result = await this.settings!.documentCache?.get(textDocument);
    if (!result) return diagnostics;
    const { api } = result;

    const docNs: string = isAsyncDoc(text) ? 'asyncapi' : 'openapi';
    // no API document has been parsed
    if (api === undefined) return diagnostics;
    const specVersion = getSpecVersion(api);
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
          'syntax',
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

      const allProvidersDiagnostics: Diagnostic[] = [];
      for (const provider of this.validationProviders) {
        if (
          provider.namespaces().some((ns) => ns.namespace === docNs && ns.version === specVersion)
        ) {
          allProvidersDiagnostics.push(
            ...// eslint-disable-next-line no-await-in-loop
            (await provider.doValidation(textDocument, api, validationContext)),
          );
          if (provider.break()) {
            break;
          }
        }
      }

      diagnostics.push(...allProvidersDiagnostics);
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
              if (
                meta.targetSpecs &&
                !meta.targetSpecs.some(
                  (nsv) => nsv.namespace === docNs && nsv.version === specVersion,
                )
              ) {
                // eslint-disable-next-line no-continue
                continue;
              }
              const linterFuncName = meta.linterFunction;
              if (linterFuncName) {
                // first check if it is a standard function and exists.
                let lintFunc: ((...args: any[]) => boolean) | undefined =
                  standardLinterfunctions.find((e) => e.functionName === linterFuncName)?.function;
                // else get it from configuration
                if (!lintFunc) {
                  lintFunc = this.settings?.metadata?.linterFunctions[docNs][linterFuncName];
                }
                if (lintFunc) {
                  try {
                    let lintRes = true;
                    if (
                      meta.target &&
                      meta.target.length > 0 &&
                      isObject(element) &&
                      !element.hasKey(meta.target)
                    ) {
                      // eslint-disable-next-line no-continue
                      continue;
                    }
                    const targetElement =
                      meta.target && meta.target.length > 0 && isObject(element)
                        ? element.hasKey(meta.target)
                          ? element.get(meta.target)
                          : element
                        : element;
                    if (meta.linterParams && meta.linterParams.length > 0) {
                      const params = [targetElement].concat(meta.linterParams);
                      lintRes = lintFunc(...params);
                    } else {
                      lintRes = lintFunc(targetElement);
                    }
                    if (!lintRes) {
                      // add to diagnostics
                      let lintSm = sm;
                      if (meta.target) {
                        if (isObject(element) && element.hasKey(meta.target)) {
                          if (meta.marker === 'key') {
                            lintSm = getSourceMap(element.getMember(meta.target).key as Element);
                          } else if (meta.marker === 'value') {
                            lintSm = getSourceMap(element.get(meta.target) as Element);
                          }
                        }
                      }
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
  ): QuickFixData[] | undefined {
    // @ts-ignore
    if (diagnostic.data?.quickFix) {
      // @ts-ignore
      return diagnostic.data?.quickFix;
    }

    if (diagnostic.source === APIDOM_LINTER) {
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

    const text: string = textDocument.getText();

    return this.settings!.documentCache!.get(textDocument).then((result) => {
      if (!result) {
        return [];
      }
      const { api } = result;
      if (!api) {
        return [];
      }
      const lang = isAsyncDoc(textDocument) ? 'asyncapi' : 'openapi';
      const codeActions: CodeAction[] = [];
      // TODO deduplicate, action maps elsewhere
      diagnostics.forEach((diag) => {
        const quickFixes = this.findQuickFix(diag, lang, String(diag.code));
        if (quickFixes) {
          for (const quickFix of quickFixes) {
            if (quickFix.action === 'updateValue') {
              let newText: string | undefined;
              if (quickFix.function === 'transformToLowercase') {
                newText = textDocument.getText(diag.range).toLowerCase();
              } else if (!quickFix.function) {
                if (quickFix.functionParams && quickFix.functionParams.length > 0) {
                  [newText] = quickFix.functionParams;
                }
              }
              const oldText = textDocument.getText(diag.range);
              const oldTextquotes =
                oldText.charAt(0) === '"' || oldText.charAt(0) === "'"
                  ? oldText.charAt(0)
                  : undefined;
              const quotedInsertText =
                newText && oldTextquotes && newText.startsWith(oldTextquotes);
              if (oldTextquotes && !quotedInsertText) {
                newText = oldTextquotes + newText + oldTextquotes;
              }
              if (newText || newText === '') {
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
                          newText,
                        },
                      ],
                    },
                  },
                });
              }
            } else if (quickFix.action === 'updateFieldValue') {
              let newText: string | undefined;
              // assume params exist
              // @ts-ignore
              const [target, value] = quickFix.functionParams;
              // get element from range
              const offset = textDocument.offsetAt(diag.range.start);
              // find the current node
              const node = findAtOffset({ offset: offset + 1, includeRightBound: true }, api);
              // only if we have a node
              if (node && isObject(node) && node.hasKey(target)) {
                // range of child value
                const targetSm = node.get(target);
                const location = { offset: targetSm.offset, length: targetSm.length };
                const targetRange = Range.create(
                  textDocument.positionAt(location.offset),
                  textDocument.positionAt(location.offset + location.length),
                );
                if (quickFix.function === 'transformToLowercase') {
                  newText = textDocument.getText(diag.range).toLowerCase();
                } else if (!quickFix.function) {
                  if (quickFix.functionParams && quickFix.functionParams.length > 0) {
                    [newText] = value;
                  }
                }
                const oldText = textDocument.getText(diag.range);
                const oldTextquotes =
                  oldText.charAt(0) === '"' || oldText.charAt(0) === "'"
                    ? oldText.charAt(0)
                    : undefined;
                const quotedInsertText =
                  newText && oldTextquotes && newText.startsWith(oldTextquotes);
                if (oldTextquotes && !quotedInsertText) {
                  newText = oldTextquotes + newText + oldTextquotes;
                }
                if (newText) {
                  codeActions.push({
                    // @ts-ignore
                    title: quickFix.message,
                    kind: CodeActionKind.QuickFix,
                    diagnostics: [diag],
                    edit: {
                      changes: {
                        [documentUri]: [
                          {
                            range: targetRange,
                            newText,
                          },
                        ],
                      },
                    },
                  });
                }
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
          }
        }
      });

      return codeActions;
    });
  }
}
