import { CodeAction, Diagnostic, DiagnosticSeverity, Range } from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { CodeActionParams } from 'vscode-languageserver-protocol';

import {
  LanguageSettings,
  QuickFixData,
  ValidationContext,
  ValidationProvider,
} from '../../apidom-language-types';
import { perfEnd, perfStart } from '../../utils/utils';
import {
  MustacheTag,
  parseMustacheTags,
  // getAllMustacheTags,
  // markOverlappingTags,
  pathExists,
  // logTagDetails,
} from '../completion/utils';
import { ValidationService } from './validation-service-apidom';
import { context as codegenContext } from '../completion/context';

enum PerfLabels {
  START = 'doValidation',
}

// eslint-disable-next-line import/prefer-default-export
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

  private static validateTags(
    textDocument: TextDocument,
    tags: MustacheTag[],
    diagnostics: Diagnostic[],
  ): void {
    for (const tag of tags) {
      const pointer = [tag.tagName];
      console.log('tagName', tag.tagName);
      let tagParent = tag.parent;
      while (tagParent) {
        pointer.unshift(tagParent.tagName);
        tagParent = tagParent.parent;
      }
      console.log('pointer', pointer.join('.'));
      const exists = pathExists(codegenContext, pointer);
      console.log('exists', exists, pointer.join('.'));
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
          console.log('exists 2', exists, pointer.join('.'));
          const diagnostic = Diagnostic.create(
            range,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            `Unknown tag ${pointer.join('.')}`,
            DiagnosticSeverity.Error,
            12345,
          );
          console.log('exists 3', diagnostic);
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
        DefaultValidationService.validateTags(textDocument, tag.children, diagnostics);
      }
    }
  }

  public async doValidation(
    textDocument: TextDocument,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validationContext?: ValidationContext,
  ): Promise<Diagnostic[]> {
    const diagnostics: Diagnostic[] = [];
    try {
      perfStart(PerfLabels.START);
      this.quickFixesMap = {};

      const theStack: MustacheTag[] = [];
      const theRootTags: MustacheTag[] = [];
      const tags = parseMustacheTags(textDocument.getText(), theStack, theRootTags);
      // logTagDetails(tags, textDocument);
      // let allTags: MustacheTag[] = [];
      // getAllMustacheTags(tags, allTags);
      // allTags = sortTags(allTags);
      DefaultValidationService.validateTags(textDocument, tags, diagnostics);
      perfEnd(PerfLabels.START);
      console.log('diagnostics', diagnostics);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('validation lint error', JSON.stringify(e), e);
    }
    return diagnostics;
  }

  // eslint-disable-next-line class-methods-use-this
  public async doCodeActions(
    // eslint-disable-next-line
    textDocument: TextDocument,
    // eslint-disable-next-line
    parmsOrDiagnostics: CodeActionParams | Diagnostic[],
  ): Promise<CodeAction[]> {
    return [];
  }
}
