/* eslint-disable no-param-reassign */
import {
  CompletionItem,
  CompletionItemKind,
  CompletionList,
  Position,
  Range,
  TextEdit,
} from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { CompletionParams } from 'vscode-languageserver-protocol';
import {
  Element,
  findAtOffset,
  isArrayElement,
  isBooleanElement,
  isMemberElement,
  isNullElement,
  isNumberElement,
  isObjectElement,
  isStringElement,
  MemberElement,
} from '@swagger-api/apidom-core';

import {
  ApidomCompletionItem,
  CompletionContext,
  CompletionFormat,
  CompletionProvider,
  CompletionType,
  LanguageSettings,
  MergeStrategy,
  ProviderMode,
} from '../../apidom-language-types';
import {
  checkConditions,
  getSourceMap,
  getSpecVersion,
  isMember,
  isObject,
  isArray,
  localReferencePointers,
  isPartialKey,
  getCurrentWord,
  getIndentation,
  getPreviousLineOffset,
  getNextLineOffset,
  getLine,
  isEmptyOrCommaValue,
  getNonEmptyContentRange,
  isEmptyLine,
  getRightAfterColonOffset,
  getRightAfterDashOffset,
  correctPartialKeys,
  perfStart,
  perfEnd,
  debug,
  trace,
  findNamespace,
} from '../../utils/utils';
import { standardLinterfunctions } from '../validation/linter-functions';

export interface CompletionsCollector {
  add(suggestion: unknown): void;
  setAsIncomplete(): void;
  getNumberOfProposals(): number;
}

export interface CompletionService {
  doCompletion(
    textDocument: TextDocument,
    completionParamsOrPosition: CompletionParams | Position,
    completionContext?: CompletionContext,
  ): Promise<CompletionList>;

  configure(settings?: LanguageSettings): void;

  registerProvider(provider: CompletionProvider): void;
}

enum CaretContext {
  UNDEFINED,
  KEY_START,
  KEY_END,
  KEY_INNER,
  PRIMITIVE_VALUE_START,
  PRIMITIVE_VALUE_END,
  PRIMITIVE_VALUE_INNER,
  OBJECT_VALUE_START,
  OBJECT_VALUE_INNER,
  OBJECT_VALUE_END,
  MEMBER,
}

enum CompletionNodeContext {
  UNDEFINED,
  OBJECT,
  KEY,
  VALUE_OBJECT,
  VALUE_PRIMITIVE,
}

enum PerfLabels {
  START = 'doCompletion',
  PARSE_FIRST = 'doCompletion-parse-first',
  PARSE_SECOND = 'doCompletion-parse-second',
  CORRECT_PARTIAL = 'doCompletion-correctPartialKeys',
}
export class DefaultCompletionService implements CompletionService {
  private static DELETEME = 'deleteme';

  private settings: LanguageSettings | undefined;

  private jsonSchemaCompletionService: CompletionService | undefined;

  private completionProviders: CompletionProvider[] = [];

  public constructor(jsonSchemaCompletionService?: CompletionService) {
    this.jsonSchemaCompletionService = jsonSchemaCompletionService;
  }

  public configure(settings?: LanguageSettings): void {
    this.settings = settings;
    if (settings) {
      if (settings.completionProviders) {
        this.completionProviders = settings.completionProviders;
      }
      for (const provider of this.completionProviders) {
        if (provider.configure) {
          provider.configure(settings);
        }
      }
    }
  }

  public registerProvider(provider: CompletionProvider): void {
    this.completionProviders.push(provider);
    if (this.settings) {
      if (provider.configure) {
        provider.configure(this.settings);
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private resolveCompletionNode(node: Element, caretContext: CaretContext): Element {
    switch (caretContext) {
      case CaretContext.KEY_INNER:
      case CaretContext.KEY_END:
      case CaretContext.KEY_START:
        return node.parent.parent;
      case CaretContext.MEMBER:
        return (node as MemberElement).value as Element;
      default:
        return node;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private isReferenceValue(node: Element): boolean {
    // TODO move to NS adapter plugin
    // TODO replace this with checking metadata refObject in parent
    // assume it's a value node within a member
    if (isMember(node) && (node.key as Element).toValue() === '$ref') {
      return true;
    }
    const { parent } = node;
    return parent && isMember(parent) && (parent.key as Element).toValue() === '$ref';
  }

  // eslint-disable-next-line class-methods-use-this
  private resolveCaretContext(node: Element, offset: number): CaretContext {
    let caretContext: CaretContext = CaretContext.UNDEFINED;
    if (node) {
      const sm = getSourceMap(node);
      const { parent } = node;
      if (parent && isMember(parent) && parent.key === node) {
        // we are in a key node
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (offset > sm.offset && offset < sm.endOffset!) {
          caretContext = CaretContext.KEY_INNER;
        } else if (offset === sm.offset) {
          caretContext = CaretContext.KEY_START;
        } else {
          caretContext = CaretContext.KEY_END;
        }
        return caretContext;
      }
      if (
        isStringElement(node) ||
        isNumberElement(node) ||
        isBooleanElement(node) ||
        isNullElement(node)
      ) {
        // we must be in a value primitive node
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (offset > sm.offset && offset < sm.endOffset!) {
          caretContext = CaretContext.PRIMITIVE_VALUE_INNER;
        } else if (offset === sm.offset) {
          caretContext = CaretContext.PRIMITIVE_VALUE_START;
        } else {
          caretContext = CaretContext.PRIMITIVE_VALUE_END;
        }
        return caretContext;
      }
      if (isMemberElement(node)) {
        // we are right after the separator (`:`)
        caretContext = CaretContext.MEMBER;
        return caretContext;
      }
      if (isObjectElement(node) || isArrayElement(node)) {
        // we are within an object or array
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (offset > sm.offset && offset < sm.endOffset!) {
          caretContext = CaretContext.OBJECT_VALUE_INNER;
        } else if (offset === sm.offset) {
          caretContext = CaretContext.OBJECT_VALUE_START;
        } else {
          caretContext = CaretContext.OBJECT_VALUE_END;
        }
        return caretContext;
      }
    }
    return caretContext;
  }

  // eslint-disable-next-line class-methods-use-this
  private resolveCompletionNodeContext(caretContext: CaretContext): CompletionNodeContext {
    switch (caretContext) {
      case CaretContext.KEY_START:
      case CaretContext.KEY_INNER:
      case CaretContext.OBJECT_VALUE_INNER:
      case CaretContext.OBJECT_VALUE_START:
      case CaretContext.MEMBER:
        return CompletionNodeContext.OBJECT;
      default:
        return CompletionNodeContext.UNDEFINED;
    }
  }

  /*
    see also:
      https://github.com/microsoft/monaco-editor/issues/1889
      https://github.com/microsoft/monaco-editor/issues/2070
   */
  public async doCompletion(
    textDocument: TextDocument,
    completionParamsOrPosition: CompletionParams | Position,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    completionContext?: CompletionContext,
  ): Promise<CompletionList> {
    perfStart(PerfLabels.START);
    const context = !completionContext ? this.settings?.completionContext : completionContext;
    const completionList: CompletionList = {
      items: [],
      isIncomplete: false,
    };

    const position =
      'position' in completionParamsOrPosition
        ? completionParamsOrPosition.position
        : completionParamsOrPosition;

    const text: string = textDocument.getText();
    let contentLanguage = await findNamespace(textDocument, this.settings?.defaultContentLanguage);

    const schema = false;

    // commit chars for yaml
    let valueCommitCharacters = ['\n'];
    let propertyCommitCharacters = [':'];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let endObjectNodeChar = '\n';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let endArrayNodeChar = '\n';

    // TODO handle also yaml and others, with specific logic for the format
    if (contentLanguage.format === 'JSON') {
      // commit chars for json
      valueCommitCharacters = [',', '}', ']'];
      propertyCommitCharacters = [':'];
      endObjectNodeChar = '}'; // eslint-disable-line @typescript-eslint/no-unused-vars
      endArrayNodeChar = ']'; // eslint-disable-line @typescript-eslint/no-unused-vars
    }

    const offset = textDocument.offsetAt(position);
    debug('doCompletion - position and offset', position, offset);
    trace('doCompletion - text', text);

    // if no spec version has been set, provide completion for it anyway
    // TODO handle also JSON, must identify offset
    // TODO move to adapter
    if (
      contentLanguage.namespace === 'apidom' &&
      contentLanguage.format !== 'JSON' &&
      textDocument.positionAt(offset).character === 0
    ) {
      const isEmpty = isEmptyLine(textDocument, offset);
      trace('doCompletion - no version', { isEmpty });
      const asyncItem = CompletionItem.create('asyncapi');
      asyncItem.insertText = `asyncapi: '2.5.0$1'${isEmpty ? '' : '\n'}`;
      asyncItem.documentation = {
        kind: 'markdown',
        value:
          'The version string signifies the version of the AsyncAPI Specification that the document complies to.\nThe format for this string _must_ be `major`.`minor`.`patch`.  The `patch` _may_ be suffixed by a hyphen and extra alphanumeric characters.\n\\\n\\\nA `major`.`minor` shall be used to designate the AsyncAPI Specification version, and will be considered compatible with the AsyncAPI Specification specified by that `major`.`minor` version.\nThe patch version will not be considered by tooling, making no distinction between `1.0.0` and `1.0.1`.\n\\\n\\\nIn subsequent versions of the AsyncAPI Specification, care will be given such that increments of the `minor` version should not interfere with operations of tooling developed to a lower minor version. Thus a hypothetical `1.1.0` specification should be usable with tooling designed for `1.0.0`.',
      };
      asyncItem.kind = CompletionItemKind.Keyword;
      asyncItem.insertTextFormat = 2;
      asyncItem.insertTextMode = 2;
      completionList.items.push(asyncItem);
      const oasItem = CompletionItem.create('openapi');
      oasItem.insertText = `openapi: '3.1.0$1'${isEmpty ? '' : '\n'}`;
      oasItem.documentation = {
        kind: 'markdown',
        value:
          '**REQUIRED**. This string MUST be the [version number](#versions) of the OpenAPI Specification that the OpenAPI document uses. The `openapi` field SHOULD be used by tooling to interpret the OpenAPI document. This is *not* related to the API [`info.version`](#infoVersion) string.',
      };
      oasItem.kind = CompletionItemKind.Keyword;
      oasItem.insertTextFormat = 2;
      oasItem.insertTextMode = 2;
      completionList.items.push(oasItem);
      trace('doCompletion - no version', `completionList: ${JSON.stringify(completionList)}`);
    }

    /*
     process errored YAML input badly handled by YAML parser (see https://github.com/swagger-api/apidom/issues/194)
     similarly to what done in swagger-editor: check if we are in a partial "prefix" scenario, in this case add a `:`
     to the line and parse that line instead.

     ```
     info:
       foo<caret here>
       ..
     ```

     */
    let processedText;
    let textModified = false;
    if (contentLanguage.format !== 'JSON') {
      if (isPartialKey(textDocument, offset)) {
        debug('doCompletion - isPartialKey', { offset });
        processedText = `${textDocument.getText().slice(0, offset - 1)}:${textDocument
          .getText()
          .slice(offset)}`;
        textModified = true;
      }
    }
    trace('doCompletion - processedText first', processedText);
    perfStart(PerfLabels.PARSE_FIRST);
    let result = await this.settings?.documentCache?.get(
      textDocument,
      processedText,
      PerfLabels.PARSE_FIRST,
    );
    perfEnd(PerfLabels.PARSE_FIRST);
    if (!result) return completionList;
    if (processedText) {
      contentLanguage = await findNamespace(processedText, this.settings?.defaultContentLanguage);
    }
    perfStart(PerfLabels.CORRECT_PARTIAL);
    debug('doCompletion - correctPartialKeys');
    processedText = correctPartialKeys(result, textDocument, contentLanguage.format === 'JSON');
    trace('doCompletion - processedText second', processedText);
    perfEnd(PerfLabels.CORRECT_PARTIAL);
    if (processedText) {
      contentLanguage = await findNamespace(processedText, this.settings?.defaultContentLanguage);
      debug('doCompletion - parsing processedText');
      perfStart(PerfLabels.PARSE_SECOND);
      result = await this.settings!.documentCache?.get(
        textDocument,
        processedText,
        PerfLabels.PARSE_SECOND,
      );
      perfEnd(PerfLabels.PARSE_SECOND);
      textModified = true;
    }
    if (!result) return completionList;

    const { api } = result;
    // if we cannot parse nothing to do
    if (api === undefined) return completionList;
    const docNs: string = contentLanguage.namespace;
    const specVersion = getSpecVersion(api);

    let targetOffset = textModified ? offset - 1 : offset;
    let emptyLine = false;

    let handledTarget = false;
    if (contentLanguage.format !== 'JSON' && position.character > 0) {
      /*
      This is a hack to handle empty nodes in YAML, e.g in a situation like:

      contact:
        name: test
        <caret here>

      in this case the parser doesn't set the sourceMap of the parent to contain the empty line(s)
      Therefore we look for the  offset right after the colon of the parent.

      This happens only if :
      - the line is empty
      - the caret is at the same indent position as the first non blank line above
      - the indent position is not 0 (root)
      */
      if (isEmptyLine(textDocument, offset)) {
        let alreadyInGoodNode = false;
        let nextLineOffset = getNextLineOffset(textDocument, offset);
        while (nextLineOffset !== -1 && isEmptyLine(textDocument, nextLineOffset)) {
          nextLineOffset = getNextLineOffset(textDocument, nextLineOffset);
        }
        if (nextLineOffset !== -1) {
          if (getIndentation(getLine(textDocument, nextLineOffset)) === position.character) {
            // next non empty line has same indentation, which means we are inside the correct node
            alreadyInGoodNode = true;
          }
        }
        if (!alreadyInGoodNode) {
          let prevLineOffset = getPreviousLineOffset(textDocument, offset);
          let prevLineEmpty = isEmptyLine(textDocument, prevLineOffset);
          let prevLineIndentation = prevLineEmpty
            ? -1
            : getIndentation(getLine(textDocument, prevLineOffset));
          while (
            prevLineOffset !== -1 &&
            (prevLineEmpty || prevLineIndentation > position.character)
          ) {
            prevLineOffset = getPreviousLineOffset(textDocument, prevLineOffset);
            prevLineEmpty = isEmptyLine(textDocument, prevLineOffset);
            prevLineIndentation = prevLineEmpty
              ? -1
              : getIndentation(getLine(textDocument, prevLineOffset));
          }
          if (prevLineOffset !== -1) {
            // get indent of that line and compare with the position.character
            const prevLine = getLine(textDocument, prevLineOffset);
            prevLineIndentation = getIndentation(prevLine);
            if (prevLineIndentation === position.character) {
              // set the target offset as that line
              const pos = textDocument.positionAt(prevLineOffset);
              targetOffset = textDocument.offsetAt(Position.create(pos.line, position.character));
              emptyLine = true;
              handledTarget = true;
            } else if (prevLineIndentation < position.character) {
              // check if line has empty value
              // TODO shaky, better regex grouping, consider case with colon in key
              // eslint-disable-next-line prefer-regex-literals
              const regex = new RegExp('^.*\\:{1}\\s*$');
              if (regex.test(prevLine)) {
                // set the target offset to right after the colon (empty node)
                const column = prevLine.indexOf(':') + 1;
                const pos = textDocument.positionAt(prevLineOffset);
                targetOffset = textDocument.offsetAt(Position.create(pos.line, column));
                emptyLine = true;
                handledTarget = true;
              }
            }
          }
        }
      }

      /*
      This is a hack to handle empty nodes in YAML, e.g in a situation like:

      type: <caret here>

      in this case the parser doesn't set the sourceMap of the empty value to be one space after the colon,
      but it sets it right after the colon
      TODO: check why this happens while e.g. for explicit empty strings `''` this doesn't happen.

      Therefore we look for the offset right after the colon where we found and empty value
       */
      if (!handledTarget) {
        const rightAfterColonOffset = getRightAfterColonOffset(textDocument, offset, true);
        if (rightAfterColonOffset !== -1) {
          if (position.character > getIndentation(getLine(textDocument, rightAfterColonOffset))) {
            emptyLine = true;
            targetOffset = rightAfterColonOffset;
            handledTarget = true;
          }
        }
      }
    } else if (contentLanguage.format === 'JSON' && position.character > 0) {
      /*
        This is a hack to handle empty nodes in JSON, e.g in a situation like:

        "type": <caret here>

        in this case the parser doesn't set the sourceMap of the empty value to be one space after the colon,
        but it sets it right after the colon
        TODO: check why this happens while e.g. for explicit empty strings `''` this doesn't happen.

        Therefore we look for the offset right after the colon where we found and empty value
         */
      // eslint-disable-next-line no-lonely-if
      if (isEmptyOrCommaValue(textDocument, offset)) {
        const rightAfterColonOffset = getRightAfterColonOffset(textDocument, offset, false);
        if (rightAfterColonOffset !== -1) {
          targetOffset = rightAfterColonOffset;
          handledTarget = true;
        }
      }
    }
    /*
      This is a hack to handle empty nodes in YAML array items, e.g in a situation like:

      - <caret here>

      in this case the parser doesn't set the sourceMap of the empty value to be one space after the dash,
      but it sets it right after the dash
      Therefore we look for the offset right after the dash where we found and empty value
       */
    if (!handledTarget && contentLanguage.format !== 'JSON' && position.character > 0) {
      const rightAfterDashOffset = getRightAfterDashOffset(textDocument, offset, true);
      if (rightAfterDashOffset !== -1) {
        if (
          position.character >
          getIndentation(getLine(textDocument, rightAfterDashOffset), undefined, false)
        ) {
          emptyLine = true;
          targetOffset = rightAfterDashOffset;
        }
      }
    }
    // check if we are at the end of text, get root node if that's the case
    const endOfText =
      contentLanguage.format !== 'JSON' &&
      textDocument.getText().length > 0 &&
      (targetOffset >= textDocument.getText().length ||
        textDocument.getText().substring(offset, textDocument.getText().length).trim().length ===
          0) &&
      '\r\n'.indexOf(textDocument.getText().charAt(targetOffset - 1)) !== -1;

    if (endOfText) {
      targetOffset = 0;
    }
    trace('doCompletion - text', textDocument.getText());
    debug('doCompletion - offset', offset, textDocument.positionAt(offset));
    debug('doCompletion - targetOffset', targetOffset, textDocument.positionAt(targetOffset));
    // find the current node
    const node = endOfText
      ? api
      : findAtOffset({ offset: targetOffset, includeRightBound: true }, api);
    // only if we have a node
    let completionNode: Element | undefined;
    if (node) {
      const caretContext = this.resolveCaretContext(node, targetOffset);
      completionNode = this.resolveCompletionNode(node, caretContext);
      const completionNodeContext = this.resolveCompletionNodeContext(caretContext);

      debug('doCompletion - node', node.element, node.toValue());
      debug('doCompletion - completionNode', completionNode.element, completionNode.toValue());
      debug('doCompletion - caretContext', caretContext);
      debug('doCompletion - completionNodeContext', completionNodeContext);

      let overwriteRange: Range | undefined;
      let quotes: string | undefined;

      const supportsCommitCharacters = false; // this.doesSupportsCommitCharacters(); disabled for now, waiting for new API: https://github.com/microsoft/vscode/issues/42544

      const proposed: { [key: string]: CompletionItem } = {};

      const nodeSourceMap = getSourceMap(completionNode);
      const collector: CompletionsCollector = {
        add: (suggestion: CompletionItem) => {
          const item: CompletionItem = JSON.parse(JSON.stringify(suggestion));
          let { label } = item;
          const existing = proposed[label];
          // don't suggest properties that are already present
          if (!existing) {
            label = label.replace(/[\n]/g, '↵');
            if (label.length > 60) {
              const shortenedLabel = `${label.substr(0, 57).trim()}...`;
              if (!proposed[shortenedLabel]) {
                label = shortenedLabel;
              }
            }
            if (overwriteRange) {
              item.textEdit = TextEdit.replace(overwriteRange, item.insertText || '');
            }
            if (supportsCommitCharacters) {
              item.commitCharacters =
                item.kind === CompletionItemKind.Property
                  ? propertyCommitCharacters
                  : valueCommitCharacters;
            }
            item.label = label;
            proposed[label] = item;
            completionList.items.push(item);
          } else if (!existing.documentation && item.documentation) {
            existing.documentation = item.documentation;
          }
        },
        setAsIncomplete: () => {
          completionList.isIncomplete = true;
        },
        getNumberOfProposals: () => {
          return completionList.items.length;
        },
      };

      const word = getCurrentWord(textDocument, offset);
      if (
        (isObject(completionNode) ||
          (isArray(completionNode) && contentLanguage.format === 'JSON')) &&
        (CompletionNodeContext.OBJECT === completionNodeContext ||
          CompletionNodeContext.VALUE_OBJECT === completionNodeContext ||
          textModified) &&
        (caretContext === CaretContext.KEY_INNER ||
          caretContext === CaretContext.KEY_START ||
          caretContext === CaretContext.KEY_END ||
          caretContext === CaretContext.MEMBER ||
          caretContext === CaretContext.OBJECT_VALUE_INNER ||
          caretContext === CaretContext.OBJECT_VALUE_START)
      ) {
        debug('doCompletion - adding property');
        for (const p of completionNode) {
          if (!node.parent || node.parent !== p || emptyLine) {
            proposed[p.key.toValue()] = CompletionItem.create('__');
          }
        }
        const nonEmptyContentRange = getNonEmptyContentRange(textDocument, offset);
        let nextLineNonEmptyOffset = getNextLineOffset(textDocument, offset);
        while (isEmptyLine(textDocument, nextLineNonEmptyOffset)) {
          nextLineNonEmptyOffset = getNextLineOffset(textDocument, nextLineNonEmptyOffset);
        }
        const nextLineNonEmptyContentRange = getNonEmptyContentRange(
          textDocument,
          nextLineNonEmptyOffset,
        );
        const nextLineNonEmptyContent = nextLineNonEmptyContentRange
          ? textDocument.getText(nextLineNonEmptyContentRange)
          : '';

        if (
          caretContext === CaretContext.KEY_INNER ||
          caretContext === CaretContext.KEY_END ||
          caretContext === CaretContext.MEMBER ||
          caretContext === CaretContext.OBJECT_VALUE_INNER
        ) {
          overwriteRange = nonEmptyContentRange;
        } else {
          overwriteRange = undefined;
        }
        trace('doCompletion - calling getMetadataPropertyCompletions');
        const apidomCompletions = this.getMetadataPropertyCompletions(
          api,
          completionNode,
          contentLanguage.format !== 'JSON',
          docNs,
          specVersion,
          quotes,
        );
        for (const item of apidomCompletions) {
          trace('doCompletion - apidomCompletions item', item);
          /*
            see https://github.com/microsoft/monaco-editor/issues/1889#issuecomment-642809145
            contrary to docs, range must start with the request offset. Workaround is providing
            a filterText with the content of the target range
          */
          // item.filterText = text.substring(location.offset, location.offset + location.length);
          if (
            word &&
            word.length > 0 &&
            item.insertText?.replace(/^['"]{1}/g, '').startsWith(word)
          ) {
            item.preselect = true;
          }

          if (overwriteRange) {
            item.filterText = text.substring(
              textDocument.offsetAt(overwriteRange.start),
              textDocument.offsetAt(overwriteRange.end),
            );
          }
          if (nonEmptyContentRange) {
            if (caretContext === CaretContext.KEY_INNER || caretContext === CaretContext.KEY_END) {
              if (contentLanguage.format === 'JSON') {
                if (
                  nextLineNonEmptyContent.length > 0 &&
                  ']}'.indexOf(nextLineNonEmptyContent.charAt(0)) === -1
                ) {
                  item.insertText = `${item.insertText},`;
                }
              } else {
                // item.insertText = `${item.insertText}\n`;
              }
            } else if (contentLanguage.format === 'JSON') {
              if (caretContext === CaretContext.OBJECT_VALUE_INNER) {
                item.insertText = `${item.insertText},`;
              } else {
                item.insertText = `${item.insertText},\n`;
              }
            } else if (caretContext === CaretContext.OBJECT_VALUE_INNER) {
              // item.insertText = `${item.insertText}\n`;
            } else {
              item.insertText = `${item.insertText}\n`;
            }
          } else if (contentLanguage.format === 'JSON') {
            if (
              nextLineNonEmptyContent.length > 0 &&
              ']}'.indexOf(nextLineNonEmptyContent.charAt(0)) === -1
            ) {
              item.insertText = `${item.insertText},`;
            } else {
              item.insertText = `${item.insertText}`;
            }
          } else if (contentLanguage.format === 'YAML') {
            // item.insertText = `${item.insertText}\n`;
          }
          collector.add(item);
        }
      } else if (
        // in a primitive value node
        !isObject(completionNode) &&
        (caretContext === CaretContext.MEMBER ||
          caretContext === CaretContext.PRIMITIVE_VALUE_INNER ||
          caretContext === CaretContext.PRIMITIVE_VALUE_END ||
          caretContext === CaretContext.PRIMITIVE_VALUE_START ||
          caretContext === CaretContext.OBJECT_VALUE_START)
      ) {
        // TODO Apidom doesn't hold quotes in its content currently, therefore we must use text + offset
        const nodeValueFromText = text.substring(nodeSourceMap.offset, nodeSourceMap.endOffset);
        quotes =
          nodeValueFromText.charAt(0) === '"' || nodeValueFromText.charAt(0) === "'"
            ? nodeValueFromText.charAt(0)
            : undefined;
        proposed[completionNode.toValue()] = CompletionItem.create('__');
        proposed[nodeValueFromText] = CompletionItem.create('__');
        // if node is not empty we must replace text
        if (nodeValueFromText.length > 0) {
          overwriteRange = Range.create(
            textDocument.positionAt(nodeSourceMap.offset),
            textDocument.positionAt(nodeSourceMap.endOffset!),
          );
        } else {
          // node is empty
          overwriteRange = undefined;
        }
        let apidomCompletions: CompletionItem[] | undefined;
        // check if we are in a ref value, in this case build ref pointers
        if (this.isReferenceValue(completionNode)) {
          apidomCompletions = await this.findReferencePointers(
            textDocument,
            api,
            completionNode,
            docNs,
            specVersion,
            nodeValueFromText,
            completionParamsOrPosition,
            contentLanguage.format !== 'JSON',
            context,
          );
        } else {
          apidomCompletions = this.getMetadataPropertyCompletions(
            api,
            completionNode,
            contentLanguage.format !== 'JSON',
            docNs,
            specVersion,
            quotes,
          );
        }

        if (apidomCompletions) {
          for (const item of apidomCompletions) {
            const completionTextQuotes =
              item.insertText?.charAt(0) === '"' || item.insertText?.charAt(0) === "'"
                ? item.insertText?.charAt(0)
                : undefined;

            const unquotedOriginalInsertText = !completionTextQuotes
              ? item.insertText
              : item.insertText?.substring(1, item.insertText.length);
            if (!completionTextQuotes && quotes) {
              item.insertText = quotes + item.insertText + quotes;
            }
            /*
              see https://github.com/microsoft/monaco-editor/issues/1889#issuecomment-642809145
              contrary to docs, range must start with the request offset. Workaround is providing
              a filterText with the content of the target range
            */
            item.filterText = text.substring(nodeSourceMap.offset, nodeSourceMap.endOffset!);

            if (word && word.length > 0 && unquotedOriginalInsertText?.startsWith(word)) {
              collector.add(item);
            } else if (!word) {
              collector.add(item);
            }
          }
        }
      }

      if (schema) {
        // TODO complete schema based, see json language service and "lsp" branch
        // DefaultCompletionService.getJsonSchemaPropertyCompletions(schema, api, node, addValue, separatorAfter, collector);
      } else {
        //
      }
    }

    if (this.jsonSchemaCompletionService) {
      this.jsonSchemaCompletionService
        .doCompletion(textDocument, completionParamsOrPosition, context)
        .then((schemaList) => {
          completionList.items.push(...schemaList.items);
        });
    }
    perfEnd(PerfLabels.START);
    try {
      // TODO (francesco@tumanischvili@smartbear.com)  try using the "repaired" version of the doc (serialize apidom skipping errors and missing)
      for (const provider of this.completionProviders) {
        if (
          provider
            .namespaces()
            .some((ns) => ns.namespace === docNs && ns.version === specVersion) &&
          provider.doCompletion &&
          (!provider.providerMode || provider.providerMode() === ProviderMode.FULL)
        ) {
          // eslint-disable-next-line no-await-in-loop
          const completionProviderResult = await provider.doCompletion(
            textDocument,
            completionNode,
            api,
            completionParamsOrPosition,
            completionList.items,
            context,
          );
          switch (completionProviderResult.mergeStrategy) {
            case MergeStrategy.APPEND:
              completionList.items.push(...completionProviderResult.completionList.items);
              break;
            case MergeStrategy.PREPEND:
              completionList.items.unshift(...completionProviderResult.completionList.items);
              break;
            case MergeStrategy.REPLACE:
              completionList.items.splice(
                0,
                completionList.items.length,
                ...completionProviderResult.completionList.items,
              );
              break;
            case MergeStrategy.IGNORE:
              break;
            default:
              completionList.items.push(...completionProviderResult.completionList.items);
          }
          if (provider.break()) {
            break;
          }
        }
      }
    } catch (e) {
      console.log('error in validation provider');
    }
    return completionList;
  }

  public async findReferencePointers(
    textDocument: TextDocument,
    doc: Element,
    node: Element,
    docNs: string,
    specVersion: string,
    nodeValue: string,
    completionParamsOrPosition: CompletionParams | Position,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    yaml: boolean,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    completionContext?: CompletionContext,
  ): Promise<CompletionItem[]> {
    const result: CompletionItem[] = [];
    // get type of node (element)
    const refElementType = node.parent?.parent
      ?.getMetaProperty('referenced-element', '')
      ?.toValue();
    const nodeElement =
      refElementType && refElementType.length > 0 ? refElementType : node.parent?.parent?.element;
    if (!nodeElement) return result;

    const pointers = localReferencePointers(doc, nodeElement);
    // build completion item
    let i = 97;
    for (const p of pointers) {
      const valueQuotes = yaml ? "'" : '"';
      const sm = getSourceMap(p.node);
      const item: CompletionItem = {
        label: p.ref,
        insertText: `${valueQuotes}${p.ref}$1${valueQuotes}`,
        kind: 18,
        documentation: textDocument.getText().substring(sm.offset, sm.endOffset),
        // detail: 'DETAIL', // on top of right hand documentation panel
        // labelDetails: {
        // detail: 'LABELDETAILDETAIL', // right after label
        // description: 'local', // right aligned in label panel
        // },
        insertTextFormat: 2,
        sortText: `${String.fromCharCode(i)}`,
      };
      result.push(item);
      i += 1;
    }
    // TODO also add to completion description target fragment so user can preview
    try {
      // TODO (francesco@tumanischvili@smartbear.com)  try using the "repaired" version of the doc (serialize apidom skipping errors and missing)
      for (const provider of this.completionProviders) {
        if (
          provider
            .namespaces()
            .some((ns) => ns.namespace === docNs && ns.version === specVersion) &&
          provider.doRefCompletion &&
          provider.providerMode &&
          provider.providerMode() === ProviderMode.REF
        ) {
          // eslint-disable-next-line no-await-in-loop
          const completionProviderResult = await provider.doRefCompletion(
            textDocument,
            node,
            doc,
            nodeValue,
            nodeElement,
            completionParamsOrPosition,
            result,
            completionContext,
          );
          switch (completionProviderResult.mergeStrategy) {
            case MergeStrategy.APPEND:
              result.push(...completionProviderResult.completionList.items);
              break;
            case MergeStrategy.PREPEND:
              result.unshift(...completionProviderResult.completionList.items);
              break;
            case MergeStrategy.REPLACE:
              result.splice(0, result.length, ...completionProviderResult.completionList.items);
              break;
            case MergeStrategy.IGNORE:
              break;
            default:
              result.push(...completionProviderResult.completionList.items);
          }
          if (provider.break()) {
            break;
          }
        }
      }
    } catch (e) {
      console.log('error in validation provider');
    }
    return result;
  }

  private getMetadataPropertyCompletions(
    doc: Element,
    node: Element,
    yaml: boolean,
    docNs: string,
    specVersion: string,
    quotes: string | undefined,
  ): CompletionItem[] {
    debug('getMetadataPropertyCompletions', node.element, yaml, docNs, specVersion, quotes);
    const apidomCompletions: ApidomCompletionItem[] = [];
    let set: string[] = [];
    if (node.classes) {
      set = Array.from(new Set(node.classes.toValue()));
    }
    const referencedElement = node.getMetaProperty('referenced-element', '').toValue();
    // TODO maybe move to adapter
    if (referencedElement.length > 0 && referencedElement === 'schema') {
      set.unshift('schema');
    }
    set.unshift(node.element);
    set.forEach((s) => {
      debug('getMetadataPropertyCompletions - class', s);
      const classCompletions: ApidomCompletionItem[] = doc.meta
        .get('metadataMap')
        ?.get(s)
        ?.get('completion')
        ?.toValue();
      if (classCompletions) {
        apidomCompletions.push(...classCompletions.filter((ci) => !ci.target));
      }
      debug('getMetadataPropertyCompletions - class apidomCompletions', apidomCompletions);
      // check also parent for completions with `target` property
      // get parent
      if (node.parent && isMember(node.parent)) {
        const containerNode = node.parent.parent;
        const key = (node.parent.key as Element).toValue();
        // get metadata of parent with target
        const containerNodeSet: string[] = Array.from(new Set(containerNode.classes.toValue()));
        containerNodeSet.unshift(containerNode.element);
        containerNodeSet.forEach((containerNodeSymbol) => {
          const containerNodeClassCompletions: ApidomCompletionItem[] = doc.meta
            .get('metadataMap')
            ?.get(containerNodeSymbol)
            ?.get('completion')
            ?.toValue();
          if (containerNodeClassCompletions) {
            apidomCompletions.push(
              ...containerNodeClassCompletions.filter((ci) => ci.target === key && !ci.arrayMember),
            );
          }
        });
      }
    });
    // check also parent for completions with `target` property and `arrayMember` set to true
    // TODO merge with above, single iteration to retrieve
    if (node.parent && isArray(node.parent)) {
      const arrayParent = node.parent;
      if (arrayParent.parent && isMember(arrayParent.parent)) {
        const containerNode = arrayParent.parent.parent;
        const key = (arrayParent.parent.key as Element).toValue();
        // get metadata of parent with target
        const containerNodeSet: string[] = Array.from(new Set(containerNode.classes.toValue()));
        containerNodeSet.unshift(containerNode.element);
        containerNodeSet.forEach((containerNodeSymbol) => {
          const containerNodeClassCompletions: ApidomCompletionItem[] = doc.meta
            .get('metadataMap')
            ?.get(containerNodeSymbol)
            ?.get('completion')
            ?.toValue();
          if (containerNodeClassCompletions) {
            apidomCompletions.push(
              ...containerNodeClassCompletions.filter((ci) => {
                return ci.target === key && ci.arrayMember;
              }),
            );
          }
        });
      }
    }
    /*
      hack for JSON empty array with no quotes:
      ```
      [
        <caret here>
      ]
      ```

      while the following works
      ```
      [
        "<caret here>"
      ]
      ```
      in this case the node from offset is the parent array, so check his parent for completions with `target` property and `arrayMember` set to true
     */
    // TODO merge with above, single iteration to retrieve
    if (!yaml && isArray(node)) {
      if (node.parent && isMember(node.parent)) {
        const containerNode = node.parent.parent;
        const key = (node.parent.key as Element).toValue();
        // get metadata of parent with target
        const containerNodeSet: string[] = Array.from(new Set(containerNode.classes.toValue()));
        containerNodeSet.unshift(containerNode.element);
        containerNodeSet.forEach((containerNodeSymbol) => {
          const containerNodeClassCompletions: ApidomCompletionItem[] = doc.meta
            .get('metadataMap')
            ?.get(containerNodeSymbol)
            ?.get('completion')
            ?.toValue();
          if (containerNodeClassCompletions) {
            apidomCompletions.push(
              ...containerNodeClassCompletions.filter((ci) => {
                return ci.target === key && ci.arrayMember;
              }),
            );
          }
        });
      }
    }

    // only keep relevant to ns/version
    let filteredCompletions = apidomCompletions.filter(
      (ci) =>
        !ci.targetSpecs ||
        (ci.targetSpecs &&
          ci.targetSpecs.some((nsv) => nsv.namespace === docNs && nsv.version === specVersion)),
    );
    // only keep the ones with satisfied condition
    // TODO single filter traverse
    filteredCompletions = filteredCompletions.filter((ci) => {
      // if target is present pass parent node to check condition
      let element = node;
      if (ci.target && node.parent && isMember(node.parent)) {
        element = node.parent.parent;
      }
      return checkConditions(ci, docNs, element, doc, this.settings);
    });
    // build insert text
    // TODO refactor code branches
    // TODO add flag as user preference for quotes for yaml, and use it
    const customCompletionItems: CompletionItem[] = [];
    for (const item of filteredCompletions) {
      if (item.function) {
        const funcName = item.function;
        // first check if it is a standard function and exists.
        let func = standardLinterfunctions.find((e) => e.functionName === funcName)?.function;
        // else get it from configuration
        if (!func) {
          func = this.settings?.metadata?.linterFunctions[docNs][funcName];
        }
        if (func) {
          try {
            let lintRes: CompletionItem[] | boolean | undefined = [];
            const targetElement =
              item.target && item.target.length > 0 && isObject(node)
                ? node.hasKey(item.target)
                  ? node.get(item.target)
                  : node
                : node;

            if (
              item.functionParams &&
              Array.isArray(item.functionParams) &&
              item.functionParams.length > 0
            ) {
              const params = [targetElement].concat(item.functionParams);
              lintRes = func(...params);
            } else {
              lintRes = func(targetElement);
            }
            if (lintRes) {
              customCompletionItems.push(...(lintRes as CompletionItem[]));
              for (const customItem of customCompletionItems) {
                DefaultCompletionService.style(customItem, item, yaml, quotes);
              }
            }
          } catch (e) {
            // eslint-disable-next-line no-console
            console.log('completion function error', JSON.stringify(e), e);
          }
          item.label = DefaultCompletionService.DELETEME;
        }
      } else {
        DefaultCompletionService.style(item, item, yaml, quotes);
      }
      delete item.type;
      delete item.format;
      delete item.function;
      delete item.functionParams;
    }
    filteredCompletions = filteredCompletions.filter(
      (ci) => ci.label !== DefaultCompletionService.DELETEME,
    );
    filteredCompletions.push(...customCompletionItems);
    return filteredCompletions as CompletionItem[];
  }

  private static style(
    targetItem: CompletionItem,
    definedItem: ApidomCompletionItem,
    yaml: boolean,
    quotes?: string,
  ): void {
    switch (definedItem.type) {
      case CompletionType.VALUE:
        switch (definedItem.format) {
          case CompletionFormat.OBJECT:
            if (yaml) {
              if (quotes) {
                // if we are in YAML within quotes this shouldn't happen, leave as is
                targetItem.insertText = `${targetItem.insertText}$1`;
              } else {
                targetItem.insertText = `\n  ${targetItem.insertText}: $1`;
              }
            } else if (quotes) {
              // if we are in JSON within quotes this shouldn't happen, leave as is
              targetItem.insertText = `${targetItem.insertText}$1`;
            } else {
              targetItem.insertText = `{\n  "${targetItem.insertText}": $1\n}`;
            }
            break;
          case CompletionFormat.ARRAY:
            if (yaml) {
              if (quotes) {
                // if we are in YAML within quotes this shouldn't happen, leave as is
                targetItem.insertText = `${targetItem.insertText}$1`;
              } else {
                targetItem.insertText = `\n  - ${targetItem.insertText}: $1`;
              }
            } else if (quotes) {
              // if we are in JSON within quotes this shouldn't happen, leave as is
              targetItem.insertText = `${targetItem.insertText}$1`;
            } else {
              targetItem.insertText = `[\n  "${targetItem.insertText}": $1\n]`;
            }
            break;
          case CompletionFormat.ARRAY_OBJECT:
            if (yaml) {
              if (quotes) {
                // if we are in YAML within quotes this shouldn't happen, leave as is
                targetItem.insertText = `${targetItem.insertText}$1`;
              } else {
                targetItem.insertText = `\n  - ${targetItem.insertText}: $1`;
              }
            } else if (quotes) {
              // if we are in JSON within quotes this shouldn't happen, leave as is
              targetItem.insertText = `${targetItem.insertText}$1`;
            } else {
              targetItem.insertText = `[\n  "${targetItem.insertText}": {\n  $1\n}\n]`;
            }
            break;
          case CompletionFormat.QUOTED:
            if (yaml) {
              if (quotes) {
                targetItem.insertText = `${targetItem.insertText}$1`;
              } else {
                targetItem.insertText = `${targetItem.insertText}$1`;
              }
            } else if (quotes) {
              targetItem.insertText = `${targetItem.insertText}$1`;
            } else {
              targetItem.insertText = `"${targetItem.insertText}"$1`;
            }
            break;
          case CompletionFormat.UNQUOTED:
            if (yaml) {
              if (quotes) {
                // shouldn't happen
                targetItem.insertText = `${targetItem.insertText}$1`;
              } else {
                targetItem.insertText = `${targetItem.insertText}$1`;
              }
            } else if (quotes) {
              // shouldn't happen
              targetItem.insertText = `${targetItem.insertText}$1`;
            } else {
              targetItem.insertText = `${targetItem.insertText}$1`;
            }
            break;
          case CompletionFormat.QUOTED_FORCED:
            if (yaml) {
              if (quotes) {
                // shouldn't happen
                targetItem.insertText = `${targetItem.insertText}$1`;
              } else {
                targetItem.insertText = `'${targetItem.insertText}$1'`;
              }
            } else if (quotes) {
              targetItem.insertText = `${targetItem.insertText}$1`;
            } else {
              targetItem.insertText = `"${targetItem.insertText}"$1`;
            }
            break;
          default:
          //
        }
        break;
      case CompletionType.PROPERTY:
        switch (definedItem.format) {
          case CompletionFormat.OBJECT:
            if (yaml) {
              targetItem.insertText = `${targetItem.insertText}: \n  $1`;
            } else {
              targetItem.insertText = `"${targetItem.insertText}": {\n  $1\n}`;
            }
            break;
          case CompletionFormat.ARRAY:
            if (yaml) {
              targetItem.insertText = `${targetItem.insertText}: \n  - $1`;
            } else {
              targetItem.insertText = `"${targetItem.insertText}": [\n  $1\n]`;
            }
            break;
          case CompletionFormat.ARRAY_OBJECT:
            if (yaml) {
              targetItem.insertText = `${targetItem.insertText}: \n  - $1`;
            } else {
              targetItem.insertText = `"${targetItem.insertText}": [\n  {\n  $1\n}\n]`;
            }
            break;
          case CompletionFormat.QUOTED:
            if (yaml) {
              targetItem.insertText = `${targetItem.insertText}: $1`;
            } else {
              targetItem.insertText = `"${targetItem.insertText}": "$1"`;
            }
            break;
          case CompletionFormat.UNQUOTED:
            if (yaml) {
              targetItem.insertText = `${targetItem.insertText}: $1`;
            } else {
              targetItem.insertText = `"${targetItem.insertText}": $1`;
            }
            break;
          case CompletionFormat.QUOTED_FORCED:
            if (yaml) {
              targetItem.insertText = `${targetItem.insertText}: '$1'`;
            } else {
              targetItem.insertText = `"${targetItem.insertText}": "$1"`;
            }
            break;
          default:
          //
        }
        break;
      default:
      //
    }
  }
}
