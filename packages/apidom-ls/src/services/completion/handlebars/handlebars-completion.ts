import {
  CompletionItem,
  CompletionItemKind,
  CompletionList,
  Position,
  Range,
  TextEdit,
} from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';

import {
  findNestedPropertyKeys,
  getMustacheStrictTagInfoAtPosition,
  getMustacheTagInfoAtPosition,
  MustacheTag,
  parseMustacheTags,
} from '../../../utils/handlebars/utils';
import { getContext } from '../../../utils/handlebars/context';
import { debug, trace } from '../../../utils/utils';
import { CompletionsCollector } from '../../../apidom-language-types';

function complete(
  textDocument: TextDocument,
  position: Position,
  enableFiltering: boolean | undefined,
): CompletionList {
  const text: string = textDocument.getText();
  const completionList: CompletionList = {
    items: [],
    isIncomplete: false,
  };

  // commit chars for yaml
  const valueCommitCharacters = ['}'];
  const propertyCommitCharacters = ['}'];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const endObjectNodeChar = '}';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const endArrayNodeChar = '}';

  const offset = textDocument.offsetAt(position);
  debug('doCompletion - position and offset', position, offset);
  trace('doCompletion - text', text);

  const theStack: MustacheTag[] = [];
  const theRootTags: MustacheTag[] = [];
  const tags = parseMustacheTags(text, theStack, theRootTags);

  const tagInfo = getMustacheTagInfoAtPosition(tags, offset);
  const tagInfoStrict = getMustacheStrictTagInfoAtPosition(tags, offset);
  if (!tagInfo || !tagInfoStrict) {
    return completionList;
  }
  // const word = getCurrentWord(textDocument, offset);
  const word = tagInfoStrict.tagName.trim();
  // let pointer = tagInfo.tagName;
  const pointer = [];
  const isComplex = word && word.indexOf('.') > -1;
  let complexPrefix = '';
  if (isComplex) {
    const props = word.split('.');
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < props.length; i++) {
      pointer.push(props[i]);
    }
    complexPrefix = `${props.slice(0, props.length - 1).join('.')}.`;
  } else {
    pointer.push(tagInfo.tagName);
  }
  let tagParent = tagInfo.parent;
  while (tagParent) {
    if (tagParent.each) {
      pointer.unshift(`each ${tagParent.tagName}`);
    } else {
      pointer.unshift(tagParent.tagName);
    }
    tagParent = tagParent.parent;
  }
  const rawSuggestions = findNestedPropertyKeys(getContext(true), pointer);
  // let completionNode: Element | undefined;
  if (rawSuggestions && Array.isArray(rawSuggestions) && rawSuggestions.length > 0) {
    const apidomCompletions: CompletionItem[] = [];
    for (const rawSuggestion of rawSuggestions) {
      const item: CompletionItem = {
        label: complexPrefix + rawSuggestion,
        insertText: complexPrefix + rawSuggestion,
        kind: CompletionItemKind.Keyword,
        insertTextFormat: 2,
      };
      apidomCompletions.push(item);
    }

    // const caretContext = this.resolveCaretContext(node, targetOffset, textModified);
    // completionNode = this.resolveCompletionNode(node, caretContext);
    // const completionNodeContext = this.resolveCompletionNodeContext(caretContext);

    // debug('doCompletion - node', node.element, toValue(node));
    // debug('doCompletion - completionNode', completionNode.element, toValue(completionNode));
    // debug('doCompletion - caretContext', caretContext);
    // debug('doCompletion - completionNodeContext', completionNodeContext);

    let overwriteRange: Range | undefined;
    // let quotes: string | undefined;

    const supportsCommitCharacters = false; // this.doesSupportsCommitCharacters(); disabled for now, waiting for new API: https://github.com/microsoft/vscode/issues/42544

    const proposed: { [key: string]: CompletionItem } = {};

    // const nodeSourceMap = getSourceMap(completionNode);
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

    // const nonEmptyContentRange = getNonEmptyContentRange(textDocument, offset);
    // overwriteRange = undefined;
    for (const item of apidomCompletions) {
      trace('doCompletion - apidomCompletions item', item);
      /*
        see https://github.com/microsoft/monaco-editor/issues/1889#issuecomment-642809145
        contrary to docs, range must start with the request offset. Workaround is providing
        a filterText with the content of the target range
      */
      // item.filterText = text.substring(location.offset, location.
      // offset + location.length);
      if (word && word.length > 0 && item.insertText?.replace(/^['"]{1}/g, '').startsWith(word)) {
        item.preselect = true;
      }
      // const filterTag = tagInfo.type === 'section' ? tagIn
      if (word && word.length > 0) {
        item.filterText = text.substring(
          tagInfoStrict.tagNameStartIndex!,
          tagInfoStrict.tagNameEndIndex!,
        );
      }

      /*        if (overwriteRange) {
        item.filterText = text.substring(
          textDocument.offsetAt(overwriteRange.start),
          textDocument.offsetAt(overwriteRange.end),
        );
      } */
      if (word && word.length > 0) {
        overwriteRange = Range.create(
          textDocument.positionAt(tagInfoStrict.tagNameStartIndex!),
          textDocument.positionAt(tagInfoStrict.tagNameEndIndex!),
        );
      }

      if (overwriteRange) {
        item.filterText = text.substring(
          textDocument.offsetAt(overwriteRange.start),
          textDocument.offsetAt(overwriteRange.end),
        );
      }
      if (word && word.length > 0) {
        if (enableFiltering && item.insertText?.includes(word)) {
          collector.add(item);
        } else if (!enableFiltering) {
          collector.add(item);
        }
      } else if (!word) {
        collector.add(item);
      }
    }

    /*      if (apidomCompletions) {
      for (const item of apidomCompletions) {
        /!*
          see https://github.com/microsoft/monaco-editor/issues/1889#issuecomment-642809145
          contrary to docs, range must start with the request offset. Workaround is providing
          a filterText with the content of the target range
        *!/
        item.filterText = text.substring(tagInfo.startIndex!, tagInfo.endIndex!);
        collector.add(item);
      }
    } */
  }
  return completionList;
}

export default complete;
