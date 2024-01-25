import { Diagnostic, DiagnosticSeverity, Range } from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';

import { MustacheTag, parseMustacheTags, pathExists } from '../../../utils/handlebars/utils';
import { context as codegenContext } from '../../../utils/handlebars/context';

function validateTags(
  textDocument: TextDocument,
  tags: MustacheTag[],
  diagnostics: Diagnostic[],
): void {
  for (const tag of tags) {
    const pointer = [tag.tagName];
    let tagParent = tag.parent;
    while (tagParent) {
      pointer.unshift(tagParent.tagName);
      tagParent = tagParent.parent;
    }
    const exists = pathExists(codegenContext, pointer);
    if (!exists) {
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
    const location = { offset: tag.startIndex!, length: tag.endIndex! - tag.startIndex! };
    const range = Range.create(
      textDocument.positionAt(location.offset),
      textDocument.positionAt(location.offset + location.length),
    );

    const tagSectionOpen = tag.sectionOpenTag;
    const tagSectionClose = tag.sectionCloseTag;
    if (tagSectionOpen && !tagSectionClose) {
      const diagnostic = Diagnostic.create(
        range,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        `Missing close section tag for ${pointer.join('.')}`,
        DiagnosticSeverity.Error,
        54321,
      );
      diagnostics.push(diagnostic);
    }
    if (tag.children && tag.children.length > 0) {
      validateTags(textDocument, tag.children, diagnostics);
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
    // let allTags: MustacheTag[] = [];
    // getAllMustacheTags(tags, allTags);
    // allTags = sortTags(allTags);
    validateTags(textDocument, tags, diagnostics);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('validation lint error', JSON.stringify(e), e);
  }
  return diagnostics;
}

export default validate;
