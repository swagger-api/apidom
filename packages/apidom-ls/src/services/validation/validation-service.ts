import stampit from 'stampit';
import { CodeAction, Diagnostic, DiagnosticSeverity, Range } from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Element, findAtOffset, traverse, toValue, ObjectElement } from '@swagger-api/apidom-core';
import { CodeActionKind, CodeActionParams } from 'vscode-languageserver-protocol';
import { evaluate, evaluateMulti } from '@swagger-api/apidom-json-path';
import { dereferenceApiDOM, Reference, ReferenceSet } from '@swagger-api/apidom-reference';

import {
  APIDOM_LINTER,
  LanguageSettings,
  LinterGivenFormat,
  LinterMeta,
  LinterMetaData,
  MergeStrategy,
  MetadataMap,
  Pointer,
  ProviderMode,
  QuickFixData,
  ValidationContext,
  ValidationProvider,
  ContentLanguage,
  ReferenceValidationMode,
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
  SourceMap,
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

  private getLintingRulesSemantic(doc: Element, symbol: string, docNs: string): LinterMeta[] {
    let meta: LinterMeta[] = [];
    const elementMeta = toValue(doc.meta.get('metadataMap')?.get(symbol)?.get('lint'));
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
        rules[docNs]!.lint!.filter((r) => {
          const matchesArray =
            r.given !== undefined &&
            Array.isArray(r.given) &&
            r.given.includes(symbol) &&
            (!r.givenFormat || r.givenFormat === LinterGivenFormat.SEMANTIC);
          if (matchesArray) {
            return true;
          }
          const matchesString =
            r.given !== undefined &&
            typeof r.given === 'string' &&
            r.given === symbol &&
            (!r.givenFormat || r.givenFormat === LinterGivenFormat.SEMANTIC);
          return matchesString;
        }),
      );
    } catch (e) {
      console.log('error in retrieving semantic rules', e);
    }
    return meta;
  }

  private static buildReferenceErrorMessageFromResult(
    result: PromiseSettledResult<Element | { error: Error; refEl: Element }>,
  ): string | boolean {
    // console.log('ERRR', JSON.stringify(result));
    // console.log('ERRR', result);
    // @ts-ignore
    if (!result.value) {
      return false;
    }
    // @ts-ignore
    let errorCause = result.value?.error.cause;
    // console.log('ERRR', JSON.stringify(errorCause));
    while (errorCause?.cause) {
      errorCause = errorCause.cause;
      // console.log('ERRR', JSON.stringify(errorCause));
    }
    const pointerString = errorCause.pointer ? ` at "${errorCause.pointer}"` : '';
    // @ts-ignore
    if (errorCause.message) {
      return `${errorCause.name}: ${errorCause.message} ${pointerString}`;
    }
    return errorCause.name + pointerString;
  }

  private static buildReferenceErrorMessageFromError(ex: unknown): string | boolean {
    // @ts-ignore
    let errorCause = ex.cause;
    while (errorCause?.cause) {
      errorCause = errorCause.cause;
    }
    const pointerString = errorCause.pointer ? ` at "${errorCause.pointer}"` : '';
    if (errorCause.message) {
      return `${errorCause.name}: ${errorCause.message} ${pointerString}`;
    }
    return errorCause.name + pointerString;
  }

  private async validateReferencesConcurrent(
    refElements: Element[],
    result: Element,
    doc: Element,
    textDocument: TextDocument,
    nameSpace: ContentLanguage,
    validationContext?: ValidationContext,
  ): Promise<Diagnostic[]> {
    const SharedReferenceSet = stampit(ReferenceSet, {
      statics: {
        refs: [],
        clean() {
          // @ts-ignore
          this.refs.forEach((ref) => {
            ref.refSet = null; // eslint-disable-line no-param-reassign
          });
          // @ts-ignore
          this.refs = [];
        },
      },
      init({ refs }, { stamp }) {
        this.rootRef = null;
        this.refs = stamp.refs;

        // @ts-ignore
        refs.forEach((ref) => this.add(ref));
      },
      methods: {
        add(reference) {
          if (this.has(reference)) {
            // @ts-ignore
            const foundReference = this.find((ref) => ref.uri === reference.uri);
            const foundReferenceIndex = this.refs.indexOf(foundReference);

            this.refs[foundReferenceIndex] = reference;
          } else {
            this.rootRef = this.rootRef === null ? reference : this.rootRef;
            this.refs.push(reference);
          }
          reference.refSet = this; // eslint-disable-line no-param-reassign

          return this;
        },
        clean() {
          throw new Error('Use static SharedReferenceSet.clean() instead.');
        },
      },
    });

    const diagnostics: Diagnostic[] = [];
    const pointersMap: Record<string, Pointer[]> = {};

    const baseURI = validationContext?.baseURI
      ? validationContext?.baseURI
      : 'https://smartbear.com/';

    const derefPromises: Promise<Element | { error: Error; refEl: Element }>[] = [];
    const apiReference = Reference({ uri: baseURI, value: result });
    let fragmentId = 0;
    for (const refEl of refElements) {
      fragmentId += 1;
      const referenceElementReference = Reference({
        uri: `${baseURI}#reference${fragmentId}`,
        value: refEl,
      });
      const sharedRefSet = SharedReferenceSet({ refs: [referenceElementReference, apiReference] });

      try {
        const promise = dereferenceApiDOM(refEl, {
          resolve: {
            baseURI: `${baseURI}#reference${fragmentId}`,
            external: !toValue((refEl as ObjectElement).get('$ref')).startsWith('#'),
          },
          parse: {
            mediaType: nameSpace.mediaType,
          },
          dereference: { refSet: sharedRefSet },
        }).catch((e: Error) => {
          return { error: e, refEl };
        });
        derefPromises.push(promise);
      } catch (ex) {
        console.error('error preparing dereferencing', ex);
      }
    }
    try {
      const derefResults = await Promise.allSettled(derefPromises);
      for (const derefResult of derefResults) {
        const message = DefaultValidationService.buildReferenceErrorMessageFromResult(derefResult);
        if (message) {
          // @ts-ignore
          const refElement = derefResult.value?.refEl;
          if (refElement as Element) {
            const refValueElement = refElement.get('$ref');
            const referencedElement = toValue(refElement.getMetaProperty('referenced-element', ''));
            let pointers = pointersMap[referencedElement];
            if (!pointers) {
              pointers = localReferencePointers(doc, referencedElement, true);
              // eslint-disable-next-line no-param-reassign
              pointersMap[referencedElement] = pointers;
            }
            const lintSm = getSourceMap(refValueElement);
            const location = { offset: lintSm.offset, length: lintSm.length };
            const range = Range.create(
              textDocument.positionAt(location.offset),
              textDocument.positionAt(location.offset + location.length),
            );
            const code = `${location.offset.toString()}-${location.length.toString()}-${Date.now()}`;
            const diagnostic = Diagnostic.create(
              range,
              `Reference Error - ${message}`,
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
              if (refValueElement !== p.ref && !p.isRef) {
                diagnostic.data.quickFix.push({
                  message: `update to ${p.ref}`,
                  action: 'updateValue',
                  functionParams: [p.ref],
                });
              }
            }
            this.quickFixesMap[code] = diagnostic.data.quickFix;
            diagnostics.push(diagnostic);
          }
        }
      }
    } catch (ex) {
      console.error('error dereferencing', ex);
    } finally {
      // @ts-ignore
      SharedReferenceSet.clean();
    }
    return diagnostics;
  }

  private async validateReferencesSequential(
    refElements: Element[],
    result: Element,
    doc: Element,
    textDocument: TextDocument,
    nameSpace: ContentLanguage,
    validationContext?: ValidationContext,
  ): Promise<Diagnostic[]> {
    const diagnostics: Diagnostic[] = [];
    const pointersMap: Record<string, Pointer[]> = {};

    const baseURI = validationContext?.baseURI
      ? validationContext?.baseURI
      : 'https://smartbear.com/';

    const apiReference = Reference({ uri: baseURI, value: result });
    let fragmentId = 0;
    const refSet = ReferenceSet({ refs: [apiReference] });
    for (const refEl of refElements) {
      // @ts-ignore
      refSet.rootRef = null;
      fragmentId += 1;
      const referenceElementReference = Reference({
        uri: `${baseURI}#reference${fragmentId}`,
        value: refEl,
      });
      refSet.add(referenceElementReference);
      try {
        // eslint-disable-next-line no-await-in-loop
        await dereferenceApiDOM(refEl, {
          resolve: {
            baseURI: `${baseURI}#reference${fragmentId}`,
            external: !toValue((refEl as ObjectElement).get('$ref')).startsWith('#'),
          },
          parse: {
            mediaType: nameSpace.mediaType,
          },
          dereference: { refSet },
        });
      } catch (ex) {
        const message = DefaultValidationService.buildReferenceErrorMessageFromError(ex);
        if (message) {
          // @ts-ignore
          if (refEl as Element) {
            const refValueElement = (refEl as ObjectElement).get('$ref');
            const referencedElement = toValue(refEl.getMetaProperty('referenced-element', ''));
            let pointers = pointersMap[referencedElement];
            if (!pointers) {
              pointers = localReferencePointers(doc, referencedElement, true);
              // eslint-disable-next-line no-param-reassign
              pointersMap[referencedElement] = pointers;
            }
            const lintSm = getSourceMap(refValueElement);
            const location = { offset: lintSm.offset, length: lintSm.length };
            const range = Range.create(
              textDocument.positionAt(location.offset),
              textDocument.positionAt(location.offset + location.length),
            );
            const code = `${location.offset.toString()}-${location.length.toString()}-${Date.now()}`;
            const diagnostic = Diagnostic.create(
              range,
              `Reference Error - ${message}`,
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
              if (refValueElement !== p.ref && !p.isRef) {
                diagnostic.data.quickFix.push({
                  message: `update to ${p.ref}`,
                  action: 'updateValue',
                  functionParams: [p.ref],
                });
              }
            }
            this.quickFixesMap[code] = diagnostic.data.quickFix;
            diagnostics.push(diagnostic);
          }
        }
      }
    }
    return diagnostics;
  }

  public async doValidation(
    textDocument: TextDocument,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validationContext?: ValidationContext,
  ): Promise<Diagnostic[]> {
    perfStart(PerfLabels.START);
    const context = !validationContext ? this.settings?.validationContext : validationContext;
    const refValidationMode =
      !context || !context.referenceValidationMode
        ? ReferenceValidationMode.LEGACY
        : // eslint-disable-next-line no-bitwise
          context.referenceValidationMode | ReferenceValidationMode.LEGACY;
    const refValidationSerialProcessing =
      !context || !context.referenceValidationSequentialProcessing
        ? false
        : context.referenceValidationSequentialProcessing;
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
          context &&
          context.maxNumberOfProblems &&
          diagnostics.length > context.maxNumberOfProblems
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
        let message: string = toValue(annotation);
        if (
          message.startsWith(text.substring(0, text.length > 10 ? 10 : text.length)) &&
          message.length > 70
        ) {
          message = `YAML Syntax error: '... ${message.substring(20)}'`;
        }

        const diagnostic = Diagnostic.create(range, message, DiagnosticSeverity.Error, 0, 'syntax');
        if (context && context.relatedInformation) {
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
      if (
        refValidationMode === ReferenceValidationMode.LEGACY &&
        toValue(refValueElement).startsWith('#')
      ) {
        let pointers = pointersMap[referencedElement];
        if (!pointers) {
          pointers = localReferencePointers(doc, referencedElement, true);
          pointersMap[referencedElement] = pointers;
        }
        if (!pointers.some((p) => p.ref === toValue(refValueElement))) {
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
            if (refValueElement !== p.ref && !p.isRef) {
              diagnostic.data.quickFix.push({
                message: `update to ${p.ref}`,
                action: 'updateValue',
                functionParams: [p.ref],
              });
            }
          }
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
              toValue(refValueElement),
              refDiagnostics,
              context,
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

    const refElements: Element[] = [];

    const lint = (element: Element) => {
      if (
        toValue(element.getMetaProperty('referenced-element', '')).length > 0 &&
        isObject(element) &&
        element.hasKey('$ref') &&
        (refValidationMode === ReferenceValidationMode.APIDOM_INDIRECT_EXTERNAL ||
          toValue(element.get('$ref')).startsWith('#'))
      ) {
        refElements.push(element);
      }
      const sm = getSourceMap(element);
      const referencedElement = toValue(element.getMetaProperty('referenced-element', ''));
      if (referencedElement.length > 0) {
        // legacy lint local references
        if (isObject(element) && element.hasKey('$ref')) {
          // TODO get ref value from metadata or in adapter
          diagnostics.push(...lintReference(api, referencedElement, element.get('$ref')));
        }
      }
      if (element.classes) {
        const set: string[] = Array.from(new Set(toValue(element.classes)));
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
          const semanticLintingRules = this.getLintingRulesSemantic(api, s, docNs);
          if (semanticLintingRules && semanticLintingRules.length > 0) {
            for (const meta of semanticLintingRules) {
              this.processRule(
                meta,
                diagnostics,
                textDocument,
                api,
                element,
                sm,
                docNs,
                specVersion,
              );
            }
          }
        });
      }
    };
    traverse(lint, api);
    if (refValidationMode !== ReferenceValidationMode.LEGACY) {
      if (refValidationSerialProcessing) {
        diagnostics.push(
          ...(await this.validateReferencesSequential(
            refElements,
            result,
            api,
            textDocument,
            nameSpace,
            context,
          )),
        );
      } else {
        diagnostics.push(
          ...(await this.validateReferencesConcurrent(
            refElements,
            result,
            api,
            textDocument,
            nameSpace,
            context,
          )),
        );
      }
    }
    try {
      const rules = this.settings?.metadata?.rules;
      if (rules && rules[docNs]?.lint) {
        for (const r of rules[docNs]!.lint!) {
          if (r.givenFormat !== undefined && r.givenFormat === LinterGivenFormat.JSONPATH) {
            const matchesArray = r.given !== undefined && Array.isArray(r.given);
            if (matchesArray) {
              const elementsTuples = evaluateMulti(r.given as string[], api);
              if (elementsTuples && elementsTuples.length > 0) {
                elementsTuples.forEach((tuple) => {
                  // const tuplePath = tuple[0];
                  const tupleElements = tuple[1];
                  if (tupleElements) {
                    tupleElements.forEach((el) => {
                      const sm = getSourceMap(el);
                      this.processRule(
                        r,
                        diagnostics,
                        textDocument,
                        api,
                        el,
                        sm,
                        docNs,
                        specVersion,
                      );
                    });
                  }
                });
              }
            }
            const matchesString = r.given !== undefined && typeof r.given === 'string';
            if (matchesString) {
              const elements = evaluate(r.given as string, api);
              if (elements && elements.length > 0) {
                for (const ruleElement of elements) {
                  const sm = getSourceMap(ruleElement);
                  this.processRule(
                    r,
                    diagnostics,
                    textDocument,
                    api,
                    ruleElement,
                    sm,
                    docNs,
                    specVersion,
                  );
                }
              }
            }
          }
        }
      }
    } catch (e) {
      console.log('error in retrieving jsonpath rules', e);
    }
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
              context,
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

  private processRule(
    meta: LinterMeta,
    diagnostics: Diagnostic[],
    textDocument: TextDocument,
    api: Element,
    element: Element,
    sm: SourceMap,
    docNs: string,
    specVersion: string,
  ): void {
    if (
      meta.targetSpecs &&
      !meta.targetSpecs.some((nsv) => nsv.namespace === docNs && nsv.version === specVersion)
    ) {
      // eslint-disable-next-line no-continue
      return;
    }
    const linterFuncName = meta.linterFunction;
    if (linterFuncName) {
      // first check if it is a standard function and exists.
      let lintFunc = standardLinterfunctions.find((e) => e.functionName === linterFuncName)
        ?.function;
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
            return;
          }
          const targetElement =
            meta.target && meta.target.length > 0 && isObject(element)
              ? element.hasKey(meta.target)
                ? element.get(meta.target)
                : element
              : element;

          const conditionsSuccess = checkConditions(meta, docNs, element, api, this.settings);
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
                  endOffset: textDocument.getText().length < 6 ? textDocument.getText().length : 5,
                  length: textDocument.getText().length < 6 ? textDocument.getText().length : 5,
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
