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
import { debug, trace } from '../../../utils/utils';
import { CompletionsCollector, AnyObject } from '../../../apidom-language-types';

function complete(
  textDocument: TextDocument,
  templateContext: AnyObject,
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
    pointer.push(...props);
    complexPrefix = `${props.slice(0, props.length - 1).join('.')}.`;
  } else {
    pointer.push(tagInfo.tagName);
  }
  let tagParent = tagInfo.parent;
  while (tagParent) {
    if (tagParent.tagName.trim() === '@first' || tagParent.tagName.trim() === '@last') {
      tagParent = tagParent.parent;
      // eslint-disable-next-line no-continue
      continue;
    }
    const isComplexTagName = tagParent.tagName && tagParent.tagName.indexOf('.') > -1;
    if (isComplexTagName) {
      const props = tagParent.tagName.split('.');
      if (tagParent.each) {
        pointer.unshift(`each ${props[props.length - 1]}`); // "simple" tag name with each
      } else {
        pointer.unshift(props[props.length - 1]); // "simple" tag name
      }
      pointer.unshift(...props.slice(0, props.length - 1)); //
    } else {
      // eslint-disable-next-line no-lonely-if
      if (tagParent.each) {
        pointer.unshift(`each ${tagParent.tagName}`);
      } else {
        pointer.unshift(tagParent.tagName);
      }
    }
    tagParent = tagParent.parent;
  }
  trace('doCompletion - pointer', pointer);
  const rawSuggestions = findNestedPropertyKeys(templateContext, pointer);
  debug('doCompletion - rawSuggestions', rawSuggestions);
  // let completionNode: Element | undefined;
  const isInEach =
    tagInfoStrict.each ||
    (word.startsWith('each') &&
      (tagInfoStrict.type === 'section' ||
        tagInfoStrict.type === 'inverted' ||
        tagInfoStrict.type === 'sectionOpen'));
  if (rawSuggestions && Array.isArray(rawSuggestions) && rawSuggestions.length > 0) {
    const apidomCompletions: CompletionItem[] = [];
    for (const rawSuggestion of rawSuggestions) {
      const item: CompletionItem = {
        label: complexPrefix + rawSuggestion,
        insertText:
          isInEach && word.trim() !== 'each'
            ? `each ${complexPrefix}${rawSuggestion}`
            : complexPrefix + rawSuggestion,
        kind: CompletionItemKind.Keyword,
        insertTextFormat: 2,
      };
      debug(
        'doCompletion - insert',
        item.insertText,
        `A${word.trim()}A`,
        isInEach && word.trim() === 'each',
      );
      apidomCompletions.push(item);
    }
    let overwriteRange: Range | undefined;

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
          trace('doCompletion - collector', label, item);
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
      const strippedInsertText =
        isInEach || item.insertText?.startsWith('each ')
          ? item.insertText?.slice(5)
          : item.insertText;
      if (
        word &&
        word.length > 0 &&
        strippedInsertText?.replace(/^['"]{1}/g, '').startsWith(word)
      ) {
        item.preselect = true;
      }
      // const filterTag = tagInfo.type === 'section' ? tagIn
      if (word && word.length > 0 && word.trim() !== 'each') {
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
      if (word && word.length > 0 && word.trim() !== 'each') {
        overwriteRange = Range.create(
          textDocument.positionAt(tagInfoStrict.tagNameStartIndex!),
          textDocument.positionAt(tagInfoStrict.tagNameEndIndex!),
        );
      }
      trace('doCompletion - overwriteRange', overwriteRange);
      if (overwriteRange) {
        item.filterText = text.substring(
          textDocument.offsetAt(overwriteRange.start),
          textDocument.offsetAt(overwriteRange.end),
        );
      }
      trace('doCompletion - filterText', item.filterText);
      trace('doCompletion - word', word);
      if (word && word.length > 0) {
        if (enableFiltering && item.insertText?.includes(word) && !(word?.trim() === 'each')) {
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
