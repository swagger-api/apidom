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
import $RefParser from '@apidevtools/json-schema-ref-parser';

import {
  getMustacheStrictTagInfoAtPosition,
  getMustacheTagInfoAtPosition,
  MustacheTag,
  parseMustacheTags,
} from '../../../utils/handlebars/utils';
import {
  CompletionContext,
  CompletionProvider,
  LanguageSettings,
  CompletionService,
  CompletionsCollector,
} from '../../../apidom-language-types';
import { perfStart, perfEnd, debug, trace } from '../../../utils/utils';
import { getSchema } from '../../../utils/handlebars/context';
import { JSONSchema, JSONSchemaRef } from './jsonschema';

enum PerfLabels {
  START = 'doCompletion',
  PARSE_FIRST = 'doCompletion-parse-first',
  PARSE_SECOND = 'doCompletion-parse-second',
  CORRECT_PARTIAL = 'doCompletion-correctPartialKeys',
}
// eslint-disable-next-line import/prefer-default-export
export class HandlebarsCompletionServiceJsonSchema implements CompletionService {
  private settings: LanguageSettings | undefined;

  private completionProviders: CompletionProvider[] = [];

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

  private static findSuggestions(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    derefSchema: JSONSchema,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    pointer: string[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tags: MustacheTag[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    completionTag: MustacheTag,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    word: string,
  ): string[] | string {
    const suggestions: string[] = [];
    /*
    const isComplex = word && word.indexOf('.') > -1;
    let complexPrefix = '';
    if (isComplex) {
      const props = word.split('.');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      complexPrefix = `${props.slice(0, props.length - 1).join('.')}.`;
    } else {
      //
    }
    let tagParent = completionTag.parent;
    const tagStack: MustacheTag[] = [];
    // tagStack.push(completionTag);
    while (tagParent) {
      tagStack.unshift(tagParent);
      tagParent = tagParent.parent;
    }
    for (const tag of tagStack) {
      console.log('tag', tag.tagName, tag.each, tag.type);
      // check if section
      if (tag.type === 'section' || tag.type === 'inverted') {
        // console.log('tag', tag);
        // console.log('tag', tag.tagName);
        if (!tag.each) {
          // console.log('tag', tag);
          // console.log('tag', tag.tagName);
          currentSchema = currentSchema.properties![tag.tagName] as JSONSchema;
          if (currentSchema === undefined || currentSchema === null) {
            return suggestions;
          }
          if (typeof currentSchema === 'boolean') {
            // eslint-disable-next-line no-continue
            continue;
          }
          if (typeof currentSchema !== 'object') {
            // eslint-disable-next-line no-continue
            continue;
          }
        } else {
          console.log('each', currentSchema.properties!.combined);
          currentSchema = currentSchema.properties!.combined as JSONSchema;
        }
      } else {
        return suggestions;
      }
    }
    console.log('currentSchema', currentSchema);
*/
    return suggestions;
  }

  private static findSuggestionContexts(
    schemas: JSONSchemaRef[],
    key: string,
    each: boolean,
    pointer: string[],
    eaches: boolean[],
    index: number,
    allContexts: Record<string, JSONSchemaRef[]>,
  ): JSONSchemaRef[] {
    const contexts: JSONSchemaRef[] = [];
    console.log('start', key, index, schemas.length);
    for (const schema of schemas) {
      if (typeof schema === 'boolean') {
        return [];
      }
      console.log('schema', key, each, schema.type, schema.title);
      let jsonSchema = schema as JSONSchema;
      // console.log(key, index, '1');
      if (schema.type === 'array' && jsonSchema.items) {
        const itemsSchema = jsonSchema.items;
        if (typeof itemsSchema === 'boolean') {
          return [];
        }
        jsonSchema = itemsSchema as JSONSchema;
      }
      if (jsonSchema.properties?.[key]) {
        if (!each) {
          console.log('push props', key, index);
          // @ts-ignore
          contexts.push(jsonSchema.properties![key]);
        } else {
          console.log('each push props', key, index);
          // @ts-ignore
          if (jsonSchema.properties![key].properties) {
            // @ts-ignore
            contexts.push(...Object.values(jsonSchema.properties![key].properties));
          }
          // @ts-ignore
          if (jsonSchema.properties![key].patternProperties) {
            // @ts-ignore
            contexts.push(...Object.values(jsonSchema.properties![key].patternProperties));
          }
          // @ts-ignore
          if (jsonSchema.properties![key].additionalProperties) {
            // @ts-ignore
            contexts.push(jsonSchema.properties![key].additionalProperties);
          }
        }
      }
      if (jsonSchema.allOf) {
        for (const allOfSchema of jsonSchema.allOf) {
          // @ts-ignore
          if (allOfSchema.properties?.[key]) {
            console.log('push allOf', key, index);
            if (!each) {
              // @ts-ignore
              contexts.push(allOfSchema.properties![key]);
            } else {
              // @ts-ignore
              if (allOfSchema.properties![key].properties) {
                // @ts-ignore
                contexts.push(...Object.values(allOfSchema.properties![key].properties));
              }
              // @ts-ignore
              if (allOfSchema.properties![key].patternProperties) {
                // @ts-ignore
                contexts.push(...Object.values(allOfSchema.properties![key].patternProperties));
              }
              // @ts-ignore
              if (allOfSchema.properties![key].additionalProperties) {
                // @ts-ignore
                contexts.push(allOfSchema.properties![key].additionalProperties);
              }
            }
          }
        }
      }
      if (jsonSchema.anyOf) {
        for (const allOfSchema of jsonSchema.anyOf) {
          // @ts-ignore
          if (allOfSchema.properties?.[key]) {
            console.log('push anyOf', key, index);
            if (!each) {
              // @ts-ignore
              contexts.push(allOfSchema.properties![key]);
            } else {
              // @ts-ignore
              if (allOfSchema.properties![key].properties) {
                // @ts-ignore
                contexts.push(...Object.values(allOfSchema.properties![key].properties));
              }
              // @ts-ignore
              if (allOfSchema.properties![key].patternProperties) {
                // @ts-ignore
                contexts.push(...Object.values(allOfSchema.properties![key].patternProperties));
              }
              // @ts-ignore
              if (allOfSchema.properties![key].additionalProperties) {
                // @ts-ignore
                contexts.push(allOfSchema.properties![key].additionalProperties);
              }
            }
          }
        }
      }
      if (jsonSchema.oneOf) {
        for (const allOfSchema of jsonSchema.oneOf) {
          // @ts-ignore
          if (allOfSchema.properties?.[key]) {
            console.log('push oneOf', key, index);
            if (!each) {
              // @ts-ignore
              contexts.push(allOfSchema.properties![key]);
            } else {
              // @ts-ignore
              console.log('each push oneOf', key, index, allOfSchema.properties?.[key]);
              // @ts-ignore
              if (allOfSchema.properties![key].properties) {
                console.log('each push oneOf props', key, index);
                // @ts-ignore
                contexts.push(...Object.values(allOfSchema.properties![key].properties));
              }
              // @ts-ignore
              if (allOfSchema.properties![key].patternProperties) {
                console.log('each push oneOf patternProps', key, index);
                // @ts-ignore
                contexts.push(...Object.values(allOfSchema.properties![key].patternProperties));
              }
              // @ts-ignore
              if (allOfSchema.properties![key].additionalProperties) {
                // @ts-ignore
                contexts.push(allOfSchema.properties![key].additionalProperties);
              }
            }
          }
        }
      }
    }
    allContexts[key] = contexts;
    if (index < pointer.length - 1) {
      return HandlebarsCompletionServiceJsonSchema.findSuggestionContexts(
        contexts,
        pointer[index + 1],
        eaches[index + 1],
        pointer,
        eaches,
        index + 1,
        allContexts,
      );
    }
    return contexts;
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
    const enableFiltering = context?.enableLSPFilter;
    const completionList: CompletionList = {
      items: [],
      isIncomplete: false,
    };

    const position =
      'position' in completionParamsOrPosition
        ? completionParamsOrPosition.position
        : completionParamsOrPosition;

    const jsonSchema = getSchema();
    // const ajv2020: boolean = jsonSchema.$schema === 'https://json-schema.org/draft/2020-12/schema';

    const refParser = new $RefParser();
    /*    function onDereferenceIt(path: string, value: JSONSchemaObject): void {
      console.log('PATH', path, value);
    } */
    const refParserSchema = await refParser.dereference(jsonSchema, {
      dereference: {
        circular: true,
        // onDereference: (path: string, value: JSONSchemaObject) => console.log(path, value),
      },
    });
    // refParser
    const derefSchema = refParserSchema as JSONSchema;
    if (false) {
      // TODO complete schema based, see json language service and "lsp" branch
      // DefaultCompletionService.getJsonSchemaPropertyCompletions(schema, api, node, addValue, separatorAfter, collector);
    }

    const text: string = textDocument.getText();
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
    console.log('suggesting for pointer', pointer, word);
    // console.log('suggesting for pointer', pointer, word, tagInfo, tagInfoStrict);
    const rawSuggestions = HandlebarsCompletionServiceJsonSchema.findSuggestions(
      derefSchema,
      pointer,
      tags,
      tagInfo,
      word,
    );
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
    perfEnd(PerfLabels.START);
    return completionList;
  }
}
