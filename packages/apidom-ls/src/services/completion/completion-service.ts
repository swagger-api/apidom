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
  CompletionType,
  LanguageSettings,
} from '../../apidom-language-types';
import {
  checkConditions,
  getSourceMap,
  getSpecVersion,
  isMember,
  isObject,
  isArray,
  localReferencePointers,
} from '../../utils/utils';
import { isAsyncDoc, isJsonDoc } from '../../parser-factory';
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

export class DefaultCompletionService implements CompletionService {
  private static DELETEME = 'deleteme';

  private settings: LanguageSettings | undefined;

  private jsonSchemaCompletionService: CompletionService | undefined;

  public constructor(jsonSchemaCompletionService?: CompletionService) {
    this.jsonSchemaCompletionService = jsonSchemaCompletionService;
  }

  public configure(settings?: LanguageSettings): void {
    this.settings = settings;
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
    const position =
      'position' in completionParamsOrPosition
        ? completionParamsOrPosition.position
        : completionParamsOrPosition;

    const text: string = textDocument.getText();
    const isJson = isJsonDoc(textDocument);

    const schema = false;

    // commit chars for yaml
    let valueCommitCharacters = ['\n'];
    let propertyCommitCharacters = [':'];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let endObjectNodeChar = '\n';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let endArrayNodeChar = '\n';

    // TODO handle also yaml and others, with specific logic for the format
    if (isJson) {
      // commit chars for json
      valueCommitCharacters = [',', '}', ']'];
      propertyCommitCharacters = [':'];
      endObjectNodeChar = '}'; // eslint-disable-line @typescript-eslint/no-unused-vars
      endArrayNodeChar = ']'; // eslint-disable-line @typescript-eslint/no-unused-vars
    }

    const offset = textDocument.offsetAt(position);

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
    if (!isJson) {
      const lineContentRange = DefaultCompletionService.getNonEmptyContentRange(
        textDocument,
        offset,
      );
      const lineNonEmptyContent = lineContentRange ? textDocument.getText(lineContentRange) : '';
      const lineContent = lineContentRange
        ? DefaultCompletionService.getLine(textDocument, offset)
        : '';
      const lineIndent = DefaultCompletionService.getIndentation(lineContent);

      const prevLineOffset = DefaultCompletionService.getPreviousLineOffset(textDocument, offset);
      const prevLineContent = DefaultCompletionService.getLine(textDocument, prevLineOffset);
      const prevIndent = DefaultCompletionService.getIndentation(prevLineContent);
      const nextLineOffset = DefaultCompletionService.getNextLineOffset(textDocument, offset);
      const nextLineContent = DefaultCompletionService.getLine(textDocument, nextLineOffset);
      const nextIndent = DefaultCompletionService.getIndentation(nextLineContent);
      // must not be an array item AND not end with `:`
      const isValueNode = DefaultCompletionService.isValueNode(textDocument, offset);
      if (
        !isValueNode &&
        lineNonEmptyContent &&
        lineNonEmptyContent.length > 0 &&
        !lineNonEmptyContent.startsWith('-') &&
        !lineNonEmptyContent.endsWith(':') &&
        (prevIndent < lineIndent || nextIndent < prevIndent)
      ) {
        processedText = `${textDocument.getText().slice(0, offset)}:${textDocument
          .getText()
          .slice(offset)}`;
      }
    }

    const result = await this.settings?.documentCache?.get(textDocument, processedText);
    if (!result) return CompletionList.create();
    const { api } = result;
    // if we cannot parse nothing to do
    if (api === undefined) return CompletionList.create();
    const docNs: string = isAsyncDoc(text) ? 'asyncapi' : 'openapi';
    const specVersion = getSpecVersion(api);
    const completionList: CompletionList = {
      items: [],
      isIncomplete: false,
    };

    let targetOffset = offset;
    let emptyLine = false;

    let handledTarget = false;
    if (!isJson && position.character > 0) {
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
      if (DefaultCompletionService.isEmptyLine(textDocument, offset)) {
        let alreadyInGoodNode = false;
        let nextLineOffset = DefaultCompletionService.getNextLineOffset(textDocument, offset);
        while (
          nextLineOffset !== -1 &&
          DefaultCompletionService.isEmptyLine(textDocument, nextLineOffset)
        ) {
          nextLineOffset = DefaultCompletionService.getNextLineOffset(textDocument, nextLineOffset);
        }
        if (nextLineOffset !== -1) {
          if (
            DefaultCompletionService.getIndentation(
              DefaultCompletionService.getLine(textDocument, nextLineOffset),
            ) === position.character
          ) {
            // next non empty line has same indentation, which means we are inside the correct node
            alreadyInGoodNode = true;
          }
        }
        if (!alreadyInGoodNode) {
          let prevLineOffset = DefaultCompletionService.getPreviousLineOffset(textDocument, offset);
          let prevLineEmpty = DefaultCompletionService.isEmptyLine(textDocument, prevLineOffset);
          let prevLineIndentation = prevLineEmpty
            ? -1
            : DefaultCompletionService.getIndentation(
                DefaultCompletionService.getLine(textDocument, prevLineOffset),
              );
          while (
            prevLineOffset !== -1 &&
            (prevLineEmpty || prevLineIndentation > position.character)
          ) {
            prevLineOffset = DefaultCompletionService.getPreviousLineOffset(
              textDocument,
              prevLineOffset,
            );
            prevLineEmpty = DefaultCompletionService.isEmptyLine(textDocument, prevLineOffset);
            prevLineIndentation = prevLineEmpty
              ? -1
              : DefaultCompletionService.getIndentation(
                  DefaultCompletionService.getLine(textDocument, prevLineOffset),
                );
          }
          if (prevLineOffset !== -1) {
            // get indent of that line and compare with the position.character
            const prevLine = DefaultCompletionService.getLine(textDocument, prevLineOffset);
            prevLineIndentation = DefaultCompletionService.getIndentation(prevLine);
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
        const rightAfterColonOffset = DefaultCompletionService.getRightAfterColonOffset(
          textDocument,
          offset,
          true,
        );
        if (rightAfterColonOffset !== -1) {
          if (
            position.character >
            DefaultCompletionService.getIndentation(
              DefaultCompletionService.getLine(textDocument, rightAfterColonOffset),
            )
          ) {
            emptyLine = true;
            targetOffset = rightAfterColonOffset;
            handledTarget = true;
          }
        }
      }
    } else if (isJson && position.character > 0) {
      /*
        This is a hack to handle empty nodes in JSON, e.g in a situation like:

        "type": <caret here>

        in this case the parser doesn't set the sourceMap of the empty value to be one space after the colon,
        but it sets it right after the colon
        TODO: check why this happens while e.g. for explicit empty strings `''` this doesn't happen.

        Therefore we look for the offset right after the colon where we found and empty value
         */
      // eslint-disable-next-line no-lonely-if
      if (DefaultCompletionService.isEmptyOrCommaValue(textDocument, offset)) {
        const rightAfterColonOffset = DefaultCompletionService.getRightAfterColonOffset(
          textDocument,
          offset,
          false,
        );
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
    if (!handledTarget && !isJson && position.character > 0) {
      const rightAfterDashOffset = DefaultCompletionService.getRightAfterDashOffset(
        textDocument,
        offset,
        true,
      );
      if (rightAfterDashOffset !== -1) {
        if (
          position.character >
          DefaultCompletionService.getIndentation(
            DefaultCompletionService.getLine(textDocument, rightAfterDashOffset),
            undefined,
            false,
          )
        ) {
          emptyLine = true;
          targetOffset = rightAfterDashOffset;
        }
      }
    }
    // check if we are at the end of text, get root node if that's the case
    const endOfText =
      !isJson &&
      textDocument.getText().length > 0 &&
      (targetOffset >= textDocument.getText().length ||
        textDocument.getText().substring(offset, textDocument.getText().length).trim().length ===
          0) &&
      '\r\n'.indexOf(textDocument.getText().charAt(targetOffset - 1)) !== -1;

    if (endOfText) {
      targetOffset = 0;
    }
    // find the current node
    const node = endOfText
      ? api
      : findAtOffset({ offset: targetOffset, includeRightBound: true }, api);
    // only if we have a node
    if (node) {
      const caretContext = this.resolveCaretContext(node, targetOffset);
      const completionNode = this.resolveCompletionNode(node, caretContext);
      const completionNodeContext = this.resolveCompletionNodeContext(caretContext);

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

      const word = DefaultCompletionService.getCurrentWord(textDocument, offset);
      if (
        (isObject(completionNode) || (isArray(completionNode) && isJson)) &&
        (CompletionNodeContext.OBJECT === completionNodeContext ||
          CompletionNodeContext.VALUE_OBJECT === completionNodeContext ||
          processedText) &&
        (caretContext === CaretContext.KEY_INNER ||
          caretContext === CaretContext.KEY_START ||
          caretContext === CaretContext.KEY_END ||
          caretContext === CaretContext.MEMBER ||
          caretContext === CaretContext.OBJECT_VALUE_INNER ||
          caretContext === CaretContext.OBJECT_VALUE_START)
      ) {
        for (const p of completionNode) {
          if (!node.parent || node.parent !== p || emptyLine) {
            proposed[p.key.toValue()] = CompletionItem.create('__');
          }
        }
        const nonEmptyContentRange = DefaultCompletionService.getNonEmptyContentRange(
          textDocument,
          offset,
        );
        let nextLineNonEmptyOffset = DefaultCompletionService.getNextLineOffset(
          textDocument,
          offset,
        );
        while (DefaultCompletionService.isEmptyLine(textDocument, nextLineNonEmptyOffset)) {
          nextLineNonEmptyOffset = DefaultCompletionService.getNextLineOffset(
            textDocument,
            nextLineNonEmptyOffset,
          );
        }
        const nextLineNonEmptyContentRange = DefaultCompletionService.getNonEmptyContentRange(
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
        const apidomCompletions = this.getMetadataPropertyCompletions(
          api,
          completionNode,
          !isJsonDoc(textDocument),
          docNs,
          specVersion,
          quotes,
        );
        for (const item of apidomCompletions) {
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
              if (isJsonDoc(textDocument)) {
                if (
                  nextLineNonEmptyContent.length > 0 &&
                  ']}'.indexOf(nextLineNonEmptyContent.charAt(0)) === -1
                ) {
                  item.insertText = `${item.insertText},`;
                }
              } else {
                // item.insertText = `${item.insertText}\n`;
              }
            } else if (isJsonDoc(textDocument)) {
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
          } else if (isJsonDoc(textDocument)) {
            if (
              nextLineNonEmptyContent.length > 0 &&
              ']}'.indexOf(nextLineNonEmptyContent.charAt(0)) === -1
            ) {
              item.insertText = `${item.insertText},`;
            } else {
              item.insertText = `${item.insertText}`;
            }
          } else if (!isJsonDoc(textDocument)) {
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
          apidomCompletions = DefaultCompletionService.findReferencePointers(
            textDocument,
            api,
            completionNode,
            !isJsonDoc(textDocument),
          );
        } else {
          apidomCompletions = this.getMetadataPropertyCompletions(
            api,
            completionNode,
            !isJsonDoc(textDocument),
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
        .doCompletion(textDocument, completionParamsOrPosition, completionContext)
        .then((schemaList) => {
          completionList.items.push(...schemaList.items);
        });
    }
    return completionList;
  }

  private static getCurrentWord(document: TextDocument | string, offset: number) {
    let i = offset - 1;
    const text = typeof document === 'string' ? document : document.getText();
    while (i >= 0 && ' \t\n\r\v"\':{[,]}'.indexOf(text.charAt(i)) === -1) {
      i -= 1;
    }
    return text.substring(i + 1, offset);
  }

  private static getRightAfterColonOffset(
    document: TextDocument | string,
    offset: number,
    mustBeEmpty: boolean,
  ): number {
    const text = typeof document === 'string' ? document : document.getText();
    let i = offset - 1;
    while (i >= 0 && ':'.indexOf(text.charAt(i)) === -1) {
      i -= 1;
    }
    const rightAfterColon = i + 1;
    if (text.substring(i + 1, offset).trim().length > 0) {
      return -1;
    }
    if (!mustBeEmpty) {
      return rightAfterColon;
    }
    i = offset;
    while (text.charAt(i).length > 0 && '\n\r'.indexOf(text.charAt(i)) === -1) {
      i += 1;
    }
    if (text.substring(offset, i + 1).trim().length > 0) {
      return -1;
    }
    return rightAfterColon;
  }

  private static isValueNode(document: TextDocument | string, offset: number): boolean {
    const text = typeof document === 'string' ? document : document.getText();
    let i = offset - 1;
    while (i >= 0 && ':\r\n'.indexOf(text.charAt(i)) === -1) {
      i -= 1;
    }
    if ('\r\n'.indexOf(text.charAt(i)) === -1) {
      return true;
    }
    return false;
  }

  private static getRightAfterDashOffset(
    document: TextDocument | string,
    offset: number,
    mustBeEmpty: boolean,
  ): number {
    const text = typeof document === 'string' ? document : document.getText();
    let i = offset - 1;
    while (i >= 0 && '-'.indexOf(text.charAt(i)) === -1) {
      i -= 1;
    }
    const rightAfterDash = i + 1;
    if (text.substring(i + 1, offset).trim().length > 0) {
      return -1;
    }
    if (!mustBeEmpty) {
      return rightAfterDash;
    }
    i = offset;
    while (text.charAt(i).length > 0 && '\n\r'.indexOf(text.charAt(i)) === -1) {
      i += 1;
    }
    if (text.substring(offset, i + 1).trim().length > 0) {
      return -1;
    }
    return rightAfterDash;
  }

  private static getLine(document: TextDocument | string, offset: number): string {
    const text = typeof document === 'string' ? document : document.getText();
    let i = offset - 1;
    while (i >= 0 && '\r\n'.indexOf(text.charAt(i)) === -1) {
      i -= 1;
    }
    const start = i;
    i = offset;
    while (text.charAt(i).length > 0 && '\n\r'.indexOf(text.charAt(i)) === -1) {
      i += 1;
    }
    const end = i;
    return text.substring(start + 1, end);
  }

  private static getLineAfterOffset(document: TextDocument | string, offset: number): string {
    const text = typeof document === 'string' ? document : document.getText();
    let i = offset;
    while (text.charAt(i).length > 0 && '\n\r'.indexOf(text.charAt(i)) === -1) {
      i += 1;
    }
    const end = i;
    return text.substring(offset, end);
  }

  private static getNonEmptyContentRange(
    document: TextDocument | string,
    offset: number,
  ): Range | undefined {
    if (offset < 0) {
      return undefined;
    }
    const text = typeof document === 'string' ? document : document.getText();
    const doc =
      typeof document === 'string'
        ? TextDocument.create('foo://bar/spec.yaml', 'json', 0, document)
        : document;
    let i = offset - 1;
    // go to beginning of line
    while (i >= 0 && '\r\n'.indexOf(text.charAt(i)) === -1) {
      i -= 1;
    }
    // go to the first non space
    while (i < text.length && ' \t\n\r\v'.indexOf(text.charAt(i)) !== -1) {
      i += 1;
    }
    const start = i;
    // go to the end of line
    i = offset;
    while (i < text.length && '\r\n'.indexOf(text.charAt(i)) === -1) {
      i += 1;
    }
    // go back to the first non space
    while (i > start && ' \t\n\r\v'.indexOf(text.charAt(i)) !== -1) {
      i -= 1;
    }
    const end = i + 1;
    if (end - start < 1) {
      return undefined;
    }
    const result = Range.create(doc.positionAt(start), doc.positionAt(end));
    return result;
  }

  private static getPreviousLineOffset(document: TextDocument | string, offset: number): number {
    const text = typeof document === 'string' ? document : document.getText();
    let i = offset - 1;
    while (i >= 0 && '\r\n'.indexOf(text.charAt(i)) === -1) {
      i -= 1;
    }
    if (i === 0) {
      return -1;
    }
    return i;
  }

  private static getNextLineOffset(document: TextDocument | string, offset: number): number {
    const text = typeof document === 'string' ? document : document.getText();
    let i = offset;
    while (i < text.length && '\r\n'.indexOf(text.charAt(i)) === -1) {
      i += 1;
    }
    if (i >= text.length - 1) {
      return -1;
    }
    // consider \r\n
    if ('\r\n'.indexOf(text.charAt(i + 1)) !== -1 && i + 2 < text.length) {
      return i + 2;
    }
    return i + 1;
  }

  private static isLastField(document: TextDocument | string, offset: number): boolean {
    const text = typeof document === 'string' ? document : document.getText();
    const doc =
      typeof document === 'string'
        ? TextDocument.create('foo://bar/spec.yaml', 'json', 0, document)
        : document;
    let i = offset;
    while (i < text.length && '}]'.indexOf(text.charAt(i)) === -1) {
      i += 1;
    }
    const after = doc.getText(Range.create(doc.positionAt(offset), doc.positionAt(offset + i)));
    if (after.trim().length === 0) {
      return true;
    }
    return false;
  }

  private static isEmptyLine(document: TextDocument | string, offset: number): boolean {
    return DefaultCompletionService.getLine(document, offset).trim().length === 0;
  }

  private static isEmptyOrCommaValue(document: TextDocument | string, offset: number): boolean {
    const line = DefaultCompletionService.getLineAfterOffset(document, offset).trim();
    if (line.length === 0) {
      return true;
    }
    if (line.endsWith(',')) {
      return true;
    }
    return false;
  }

  public static getIndentation(
    lineContent: string,
    position?: number,
    considerArrayItem = true,
  ): number {
    if (position && lineContent.length < position) {
      return 0;
    }

    if (!position) {
      // eslint-disable-next-line no-param-reassign
      position = lineContent.length;
    }

    let result = -1;
    for (let i = 0; i < position; i += 1) {
      const char = lineContent.charCodeAt(i);
      if (char !== 32 && char !== 9) {
        result = i;
        break;
      }
    }
    if (considerArrayItem && result) {
      if (lineContent.charAt(result) === '-') {
        result += 1;
        if (
          result < position &&
          (lineContent.charCodeAt(result) === 32 || lineContent.charCodeAt(result) === 9)
        ) {
          result += 1;
        }
      }
    }
    // assuming that current position is indentation
    return result > -1 ? result : position;
  }

  public static findReferencePointers(
    textDocument: TextDocument,
    doc: Element,
    node: Element,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    yaml: boolean,
  ): CompletionItem[] {
    const result: CompletionItem[] = [];
    // get type of node (element)
    const nodeElement =
      node.parent?.parent?.getMetaProperty('referenced-element')?.toValue() ||
      node.parent?.parent?.element;
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
        // detail: 'replace with',
        insertTextFormat: 2,
        sortText: `${String.fromCharCode(i)}`,
      };
      result.push(item);
      i += 1;
    }
    // TODO also add to completion description target fragment so user can preview
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
      const classCompletions: ApidomCompletionItem[] = doc.meta
        .get('metadataMap')
        ?.get(s)
        ?.get('completion')
        ?.toValue();
      if (classCompletions) {
        apidomCompletions.push(...classCompletions.filter((ci) => !ci.target));
      }
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
