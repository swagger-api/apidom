import { CodeAction, Diagnostic, DiagnosticSeverity, Range } from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Element, findAtOffset, traverse } from '@swagger-api/apidom-core';
import { CodeActionKind, CodeActionParams } from 'vscode-languageserver-protocol';

import {
  APIDOM_LINTER,
  LanguageSettings,
  LinterMeta,
  LinterMetaData,
  MergeStrategy,
  MetadataMap,
  Pointer,
  ProviderMode,
  QuickFixData,
  ValidationContext,
  ValidationProvider,
} from '../../apidom-language-types';
import {
  checkConditions,
  correctPartialKeys,
  findNamespace,
  getSourceMap,
  getSpecVersion,
  isJsonDoc,
  isMember,
  isObject,
  localReferencePointers,
  perfEnd,
  perfStart,
  processPath,
} from '../../utils/utils';
import { standardLinterfunctions } from './linter-functions';

enum PerfLabels {
  START = 'doValidation',
}

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

  private quickFixesMap: Record<string, QuickFixData[]> = {};

  public constructor() {
    this.validationEnabled = true;
    this.commentSeverity = undefined;
  }

  public registerProvider(provider: ValidationProvider): void {
    this.validationProviders.push(provider);
    if (this.settings && provider.configure) {
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
        if (provider.configure) {
          provider.configure(settings);
        }
      }
      this.validationEnabled = settings.validate;
      this.commentSeverity = settings.allowComments ? undefined : DiagnosticSeverity.Error;
      this.quickFixesMap = {};
    }
  }

  private getMetadataPropertyLint(doc: Element, metaId: string, docNs: string): LinterMeta[] {
    let meta: LinterMeta[] = [];
    const elementMeta = doc.meta.get('metadataMap')?.get(metaId)?.get('lint')?.toValue();
    if (elementMeta) {
      meta = meta.concat(elementMeta);
      meta = meta.filter((r) => !r.given);
    }
    // get namespace rules with `given` populated as array
    try {
      if (!this.settings?.metadata?.rules) {
        return meta;
      }
      const rules = this.settings?.metadata?.rules;
      if (!rules[docNs]?.lint) {
        return meta;
      }
      meta = meta.concat(
        rules[docNs]!.lint!.filter(
          (r) => r.given && Array.isArray(r.given) && r.given.includes(metaId),
        ),
      );
    } catch (e) {
      console.log('error in retrieving ns rules', e);
    }

    return meta;
  }

  public async doValidation(
    textDocument: TextDocument,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validationContext?: ValidationContext,
  ): Promise<Diagnostic[]> {
    perfStart(PerfLabels.START);
    const text: string = textDocument.getText();
    const diagnostics: Diagnostic[] = [];
    this.quickFixesMap = {};
    let result = await this.settings!.documentCache?.get(
      textDocument,
      undefined,
      'doValidation-parse-first',
    );
    if (!result) return diagnostics;

    let processedText;
    const nameSpace = await findNamespace(text, this.settings?.defaultContentLanguage);
    let docNs: string = nameSpace.namespace;
    // no API document has been parsed
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
        let location = { offset: nodeSourceMap.offset, length: nodeSourceMap.length };
        if (
          nameSpace.format === 'YAML' &&
          nodeSourceMap.offset === 0 &&
          nodeSourceMap.endLine &&
          nodeSourceMap.endColumn
        ) {
          // workaround "whole doc" YAML grammar error
          location = {
            offset: textDocument.offsetAt({ line: nodeSourceMap.endLine, character: 0 }),
            length: nodeSourceMap.endColumn,
          };
        }

        const range = Range.create(
          textDocument.positionAt(location.offset),
          textDocument.positionAt(location.offset + location.length),
        );
        let message: string = annotation.toValue();
        if (
          message.startsWith(text.substring(0, text.length > 10 ? 10 : text.length)) &&
          message.length > 70
        ) {
          message = `YAML Syntax error: '... ${message.substring(20)}'`;
        }

        const diagnostic = Diagnostic.create(range, message, DiagnosticSeverity.Error, 0, 'syntax');
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
      processedText = correctPartialKeys(result, textDocument, await isJsonDoc(textDocument));
    }
    if (processedText) {
      docNs = (await findNamespace(processedText, this.settings?.defaultContentLanguage)).namespace;
      result = await this.settings!.documentCache?.get(
        textDocument,
        processedText,
        'doValidation-parse-second',
      );
    }
    if (!result) return diagnostics;
    const { api } = result;

    if (api === undefined) return diagnostics;
    const specVersion = getSpecVersion(api);

    const hasSyntaxErrors = !!diagnostics.length;

    const pointersMap: Record<string, Pointer[]> = {};
    const lintReference = (
      doc: Element,
      referencedElement: string,
      refValueElement: Element,
    ): Diagnostic[] => {
      const refDiagnostics: Diagnostic[] = [];
      if (refValueElement.toValue().startsWith('#')) {
        let pointers = pointersMap[referencedElement];
        if (!pointers) {
          pointers = localReferencePointers(doc, referencedElement);
          pointersMap[referencedElement] = pointers;
        }
        if (!pointers.some((p) => p.ref === refValueElement.toValue())) {
          // local ref not found
          const lintSm = getSourceMap(refValueElement);
          const location = { offset: lintSm.offset, length: lintSm.length };
          const range = Range.create(
            textDocument.positionAt(location.offset),
            textDocument.positionAt(location.offset + location.length),
          );
          const code = `${location.offset.toString()}-${location.length.toString()}-${Date.now()}`;
          const diagnostic = Diagnostic.create(
            range,
            'local reference not found',
            DiagnosticSeverity.Error,
            code,
            'apilint',
          );

          diagnostic.source = 'apilint';
          diagnostic.data = {
            quickFix: [],
          } as LinterMetaData;
          for (const p of pointers) {
            // @ts-ignore
            diagnostic.data.quickFix.push({
              message: `update to ${p.ref}`,
              action: 'updateValue',
              functionParams: [p.ref],
            });
          }
          // @ts-ignore
          this.quickFixesMap[code] = diagnostic.data.quickFix;

          refDiagnostics.push(diagnostic);
        }
      }
      try {
        // TODO (francesco@tumanischvili@smartbear.com)  try using the "repaired" version of the doc (serialize apidom skipping errors and missing)
        for (const provider of this.validationProviders) {
          if (
            provider
              .namespaces()
              .some((ns) => ns.namespace === docNs && ns.version === specVersion) &&
            provider.doRefValidation &&
            provider.providerMode &&
            provider.providerMode() === ProviderMode.REF
          ) {
            // eslint-disable-next-line no-await-in-loop
            const validationProviderResult = provider.doRefValidation(
              textDocument,
              api,
              refValueElement,
              referencedElement,
              refValueElement.toValue(),
              refDiagnostics,
              validationContext,
            );
            switch (validationProviderResult.mergeStrategy) {
              case MergeStrategy.APPEND:
                refDiagnostics.push(...validationProviderResult.diagnostics);
                break;
              case MergeStrategy.PREPEND:
                refDiagnostics.unshift(...validationProviderResult.diagnostics);
                break;
              case MergeStrategy.REPLACE:
                refDiagnostics.splice(
                  0,
                  diagnostics.length,
                  ...validationProviderResult.diagnostics,
                );
                break;
              case MergeStrategy.IGNORE:
                break;
              default:
                refDiagnostics.push(...validationProviderResult.diagnostics);
            }

            if (validationProviderResult.quickFixes) {
              // eslint-disable-next-line guard-for-in
              for (const fix in validationProviderResult.quickFixes) {
                this.quickFixesMap[fix] = validationProviderResult.quickFixes[fix];
              }
            }
            if (provider.break()) {
              break;
            }
          }
        }
      } catch (e) {
        console.log('error in validation provider', e);
      }
      return refDiagnostics;
    };

    const lint = (element: Element) => {
      const sm = getSourceMap(element);
      const referencedElement = element.getMetaProperty('referenced-element', '').toValue();
      if (referencedElement.length > 0) {
        // lint local references
        if (isObject(element) && element.hasKey('$ref')) {
          // TODO get ref value from metadata or in adapter
          diagnostics.push(...lintReference(api, referencedElement, element.get('$ref')));
        }
      }
      if (element.classes) {
        const set: string[] = Array.from(new Set(element.classes.toValue()));
        // add element value to the set (e.g. 'pathItem', 'operation'
        if (!set.includes(element.element)) {
          set.unshift(element.element);
        }
        if (referencedElement.length > 0) {
          if (!set.includes(referencedElement)) {
            set.unshift(referencedElement);
          }
        }
        set.unshift('*');

        set.forEach((s) => {
          // get linter meta from meta
          const linterMeta = this.getMetadataPropertyLint(api, s, docNs);
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
                let lintFunc = standardLinterfunctions.find(
                  (e) => e.functionName === linterFuncName,
                )?.function;
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

                    const conditionsSuccess = checkConditions(
                      meta,
                      docNs,
                      element,
                      api,
                      this.settings,
                    );
                    if (conditionsSuccess) {
                      if (
                        meta.linterParams &&
                        Array.isArray(meta.linterParams) &&
                        meta.linterParams.length > 0
                      ) {
                        const params = [targetElement].concat(meta.linterParams);
                        lintRes = lintFunc(...params) as boolean;
                      } else {
                        lintRes = lintFunc(targetElement) as boolean;
                      }
                      if (meta.negate) lintRes = !lintRes;
                      if (!lintRes) {
                        // add to diagnostics
                        let lintSm = sm;
                        // check if root
                        if (!element.parent || element.parent.element === 'parseResult') {
                          // TODO use create
                          lintSm = {
                            offset: 0,
                            endOffset:
                              textDocument.getText().length < 6 ? textDocument.getText().length : 5,
                            length:
                              textDocument.getText().length < 6 ? textDocument.getText().length : 5,
                            column: 0,
                            endColumn: 0,
                            endLine: 0,
                            line: 0,
                          };
                        }
                        if (meta.target) {
                          if (isObject(element) && element.hasKey(meta.target)) {
                            if (meta.marker === 'key') {
                              lintSm = getSourceMap(element.getMember(meta.target).key as Element);
                            } else if (meta.marker === 'value') {
                              lintSm = getSourceMap(element.get(meta.target) as Element);
                            }
                          }
                        }
                        let markerElement = element;
                        if (meta.markerTarget && meta.markerTarget.length > 0) {
                          if (isObject(element) && element.hasKey(meta.markerTarget)) {
                            markerElement = element.get(meta.markerTarget);
                          }
                        }
                        if (meta.marker === 'key') {
                          const { parent } = markerElement;
                          if (parent && isMember(parent) && parent.key !== markerElement) {
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
    perfEnd(PerfLabels.START);
    if (!hasSyntaxErrors) {
      try {
        // TODO (francesco@tumanischvili@smartbear.com)  try using the "repaired" version of the doc (serialize apidom skipping errors and missing)
        for (const provider of this.validationProviders) {
          if (
            provider
              .namespaces()
              .some((ns) => ns.namespace === docNs && ns.version === specVersion) &&
            provider.doValidation &&
            (!provider.providerMode || provider.providerMode() === ProviderMode.FULL)
          ) {
            // eslint-disable-next-line no-await-in-loop
            const validationProviderResult = await provider.doValidation(
              textDocument,
              api,
              diagnostics,
              validationContext,
            );
            switch (validationProviderResult.mergeStrategy) {
              case MergeStrategy.APPEND:
                diagnostics.push(...validationProviderResult.diagnostics);
                break;
              case MergeStrategy.PREPEND:
                diagnostics.unshift(...validationProviderResult.diagnostics);
                break;
              case MergeStrategy.REPLACE:
                diagnostics.splice(0, diagnostics.length, ...validationProviderResult.diagnostics);
                break;
              case MergeStrategy.IGNORE:
                break;
              default:
                diagnostics.push(...validationProviderResult.diagnostics);
            }
            if (validationProviderResult.quickFixes) {
              // eslint-disable-next-line guard-for-in
              for (const fix in validationProviderResult.quickFixes) {
                this.quickFixesMap[fix] = validationProviderResult.quickFixes[fix];
              }
            }
            if (provider.break()) {
              break;
            }
          }
        }
      } catch (e) {
        console.log('error in validation provider');
      }
    }

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
    const quicks = this.quickFixesMap[code];
    if (quicks) {
      // delete this.quickFixesMap[code];
      return quicks;
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
  public async doCodeActions(
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
    const lang: string = (await findNamespace(textDocument, this.settings?.defaultContentLanguage))
      .namespace;

    const isJsonDocument = await isJsonDoc(text);
    return this.settings!.documentCache!.get(textDocument, undefined, 'doCodeActions').then(
      (result) => {
        if (!result) {
          return [];
        }
        const { api } = result;
        if (!api) {
          return [];
        }
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
              } else if (quickFix.action === 'addChild') {
                // TODO (francesco@tumanischvili@smartbear.com)  functions as linter from client, defined elsewhere
                // if (quickFix.function === 'addDescription') {
                // TODO (francesco@tumanischvili@smartbear.com)  use apidom node to add a child  whenroundtrip serialization gets supported
                const newText = isJsonDocument ? quickFix.snippetJson : quickFix.snippetYaml;

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
              } else if (quickFix.action === 'removeChild') {
                // @ts-ignore
                const [target] = quickFix.functionParams;
                // get element from range
                const offset = textDocument.offsetAt(diag.range.start);
                // find the current node
                let node = findAtOffset({ offset: offset + 1, includeRightBound: true }, api);
                if (quickFix.target && node) {
                  const targetEl = processPath(node, quickFix.target, api);
                  if (targetEl) {
                    node = targetEl;
                  }
                }
                if (node && isObject(node) && node.hasKey(target)) {
                  // range of child value
                  const targetSm = getSourceMap(node.getMember(target));
                  const location = { offset: targetSm.offset, length: targetSm.length };
                  const targetRange = Range.create(
                    textDocument.positionAt(location.offset),
                    textDocument.positionAt(location.offset + location.length),
                  );
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
                            newText: '',
                          },
                        ],
                      },
                    },
                  });
                }
              }
            }
          }
        });

        return codeActions;
      },
    );
  }
}
