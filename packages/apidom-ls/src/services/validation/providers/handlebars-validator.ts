import { Diagnostic, DiagnosticSeverity, Range } from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';

import {
  Context,
  // logTagDetails,
  MustacheTag,
  parseMustacheTags,
} from '../../../utils/handlebars/utils';
import { getContext } from '../../../utils/handlebars/context';

const isArray =
  Array.isArray ||
  function isArrayPolyfill(object) {
    return Object.prototype.toString.call(object) === '[object Array]';
  };

function validateSection(
  tag: MustacheTag,
  context: Context,
  diagnostics: Diagnostic[],
  textDocument: TextDocument,
): void {
  const pointer = [tag.tagName];
  let tagParent = tag.parent;
  while (tagParent) {
    pointer.unshift(tagParent.tagName);
    tagParent = tagParent.parent;
  }
  const value = context.lookup(tag.tagName);
  if (value === undefined || value === null) {
    let location = { offset: tag.startIndex!, length: tag.endIndex! - tag.startIndex! };
    let range = Range.create(
      textDocument.positionAt(location.offset),
      textDocument.positionAt(location.offset + location.length),
    );
    if (tag.type === 'section' || tag.type === 'inverted') {
      if (tag.sectionOpenTag) {
        location = {
          offset: tag.sectionOpenTag.startIndex!,
          length: tag.sectionOpenTag.endIndex! - tag.sectionOpenTag.startIndex!,
        };
        range = Range.create(
          textDocument.positionAt(location.offset),
          textDocument.positionAt(location.offset + location.length),
        );
        const diagnostic = Diagnostic.create(
          range,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          `Unknown tag ${pointer.join('.')}`,
          DiagnosticSeverity.Error,
          12345,
        );
        diagnostics.push(diagnostic);
      }
      if (tag.sectionCloseTag) {
        location = {
          offset: tag.sectionCloseTag.startIndex!,
          length: tag.sectionCloseTag.endIndex! - tag.sectionCloseTag.startIndex!,
        };
        range = Range.create(
          textDocument.positionAt(location.offset),
          textDocument.positionAt(location.offset + location.length),
        );
        const diagnostic = Diagnostic.create(
          range,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          `Unknown tag ${pointer.join('.')}`,
          DiagnosticSeverity.Error,
          12345,
        );
        diagnostics.push(diagnostic);
      }
    } else {
      const diagnostic = Diagnostic.create(
        range,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        `Unknown tag ${pointer.join('.')}`,
        DiagnosticSeverity.Error,
        12345,
      );
      diagnostics.push(diagnostic);
    }
  }
  if (isArray(value) && value.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    validateTags(tag.children, context.push(value[0]), diagnostics, textDocument);
  } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    validateTags(tag.children, context.push(value), diagnostics, textDocument);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    validateTags(tag.children, context, diagnostics, textDocument);
  }
}

function validateVariable(
  tag: MustacheTag,
  context: Context,
  diagnostics: Diagnostic[],
  textDocument: TextDocument,
): void {
  const pointer = [tag.tagName];
  let tagParent = tag.parent;
  while (tagParent) {
    pointer.unshift(tagParent.tagName);
    tagParent = tagParent.parent;
  }
  const value = context.lookup(tag.tagName);
  if (value === undefined || value === null) {
    let location = { offset: tag.startIndex!, length: tag.endIndex! - tag.startIndex! };
    let range = Range.create(
      textDocument.positionAt(location.offset),
      textDocument.positionAt(location.offset + location.length),
    );
    if (tag.type === 'section' || tag.type === 'inverted') {
      if (tag.sectionOpenTag) {
        location = {
          offset: tag.sectionOpenTag.startIndex!,
          length: tag.sectionOpenTag.endIndex! - tag.sectionOpenTag.startIndex!,
        };
        range = Range.create(
          textDocument.positionAt(location.offset),
          textDocument.positionAt(location.offset + location.length),
        );
        const diagnostic = Diagnostic.create(
          range,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          `Unknown tag ${pointer.join('.')}`,
          DiagnosticSeverity.Error,
          12345,
        );
        diagnostics.push(diagnostic);
      }
      if (tag.sectionCloseTag) {
        location = {
          offset: tag.sectionCloseTag.startIndex!,
          length: tag.sectionCloseTag.endIndex! - tag.sectionCloseTag.startIndex!,
        };
        range = Range.create(
          textDocument.positionAt(location.offset),
          textDocument.positionAt(location.offset + location.length),
        );
        const diagnostic = Diagnostic.create(
          range,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          `Unknown tag ${pointer.join('.')}`,
          DiagnosticSeverity.Error,
          12345,
        );
        diagnostics.push(diagnostic);
      }
    } else {
      const diagnostic = Diagnostic.create(
        range,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        `Unknown tag ${pointer.join('.')}`,
        DiagnosticSeverity.Error,
        12345,
      );
      diagnostics.push(diagnostic);
    }
  }
}

function validateTags(
  tags: MustacheTag[] | undefined,
  context: Context,
  diagnostics: Diagnostic[],
  textDocument: TextDocument,
): void {
  if (!tags) {
    return;
  }
  for (const tag of tags) {
    if (tag.type === 'section' || tag.type === 'inverted') {
      validateSection(tag, context, diagnostics, textDocument);
    } else if (tag.type === 'variable' || tag.type === 'explicitVariable') {
      validateVariable(tag, context, diagnostics, textDocument);
    }
    const pointer = [tag.tagName];
    let tagParent = tag.parent;
    while (tagParent) {
      pointer.unshift(tagParent.tagName);
      tagParent = tagParent.parent;
    }

    const tagSectionOpen = tag.sectionOpenTag;
    const tagSectionClose = tag.sectionCloseTag;
    const tagSectionCloseErrored = tag.erroredSectionCloseTag;
    if (tagSectionOpen && !tagSectionClose) {
      const location = {
        offset: tagSectionOpen.startIndex!,
        length: tagSectionOpen.endIndex! - tagSectionOpen.startIndex!,
      };
      const range = Range.create(
        textDocument.positionAt(location.offset),
        textDocument.positionAt(location.offset + location.length),
      );

      const diagnostic = Diagnostic.create(
        range,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        `Missing close section tag for ${pointer.join('.')}`,
        DiagnosticSeverity.Error,
        54321,
      );
      diagnostics.push(diagnostic);
    }
    if (tagSectionCloseErrored) {
      const location = {
        offset: tagSectionCloseErrored.startIndex!,
        length: tagSectionCloseErrored.endIndex! - tagSectionCloseErrored.startIndex!,
      };
      const range = Range.create(
        textDocument.positionAt(location.offset),
        textDocument.positionAt(location.offset + location.length),
      );

      pointer[0] = tagSectionCloseErrored.tagName;
      const diagnostic = Diagnostic.create(
        range,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        `Lonely close section tag for ${pointer.join('.')}`,
        DiagnosticSeverity.Error,
        54321,
      );
      diagnostics.push(diagnostic);
    }
  }
}

function validate(textDocument: TextDocument): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  try {
    const theStack: MustacheTag[] = [];
    const theRootTags: MustacheTag[] = [];
    const tags = parseMustacheTags(textDocument.getText(), theStack, theRootTags);
    // logTagDetails(tags, textDocument);
    // logTagDetails(tags, textDocument);
    // let allTags: MustacheTag[] = [];
    // getAllMustacheTags(tags, allTags);
    // allTags = sortTags(allTags);
    // validateTags(textDocument, tags, diagnostics);
    validateTags(tags, new Context(getContext(true), undefined), diagnostics, textDocument);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('validation lint error', JSON.stringify(e), e);
  }
  return diagnostics;
}

export default validate;
