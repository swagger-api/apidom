import Ajv from 'ajv';
import * as jsonSpecV4 from 'ajv/lib/refs/json-schema-draft-04.json';

import {
  Diagnostic,
  DiagnosticSeverity,
  Range,
  Position,
  CompletionList,
  CompletionItem,
  CompletionItemKind,
  InsertTextFormat,
} from 'vscode-languageserver-types';
import jsonSourceMap from 'json-source-map';
import { CompletionParams } from 'vscode-languageserver-protocol';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { CompletionService } from '../completion/completionService';
import { CompletionContext, LanguageSettings, ValidationContext } from '../../apidomLanguageTypes';
import * as openapiSchemaJson from './openapiSchema.json';
import * as asyncapiSchemaJson from './asyncapiSchema.json';
import { isAsyncDoc } from '../../parserFactory';
import { ValidationService } from '../validation/validationService';

// eslint-disable-next-line import/prefer-default-export
export class DefaultJsonSchemaService implements CompletionService, ValidationService {
  private validationEnabled: boolean | undefined;

  private commentSeverity: DiagnosticSeverity | undefined;

  private ajv: Ajv.Ajv;

  public constructor() {
    this.validationEnabled = true;
    this.ajv = DefaultJsonSchemaService.setupAjv();
  }

  public doValidation(
    textDocument: TextDocument,
    validationContext?: ValidationContext,
  ): PromiseLike<Diagnostic[]> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise<Diagnostic[]>((resolve, reject) => {
      const diagnostics: Diagnostic[] = [];
      this.validate(textDocument.getText(), diagnostics, validationContext);
      return resolve(diagnostics);
    });
  }

  public configure(settings?: LanguageSettings): void {
    if (settings) {
      this.validationEnabled = settings.validate;
    }
  }

  public validate(
    textDocument: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    diagnostics: Diagnostic[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validationContext?: ValidationContext,
  ): void {
    if (!this.validationEnabled) {
      return;
    }
    const validateFunction = DefaultJsonSchemaService.compileAjv(this.ajv, textDocument);

    const jsonDoc = JSON.parse(textDocument);

    const valid = validateFunction(jsonDoc);
    if (!valid) {
      const sourceMap = jsonSourceMap.stringify(jsonDoc, null, 2);
      if (validateFunction.errors) {
        validateFunction.errors.forEach((error) => {
          if (
            validationContext &&
            validationContext.maxNumberOfProblems &&
            diagnostics.length > validationContext.maxNumberOfProblems
          ) {
            return;
          }
          const errorPointer = sourceMap.pointers[error.dataPath];
          const range = Range.create(
            Position.create(errorPointer.value.line, errorPointer.value.column),
            Position.create(errorPointer.valueEnd.line, errorPointer.valueEnd.column),
          );
          diagnostics.push(
            Diagnostic.create(range, error.message || '', DiagnosticSeverity.Error, 0),
          );
        });
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public doCompletion(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    textDocument: TextDocument,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    completionParams: CompletionParams,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    completionContext?: CompletionContext,
  ): PromiseLike<CompletionList> {
    // const item = CompletionItem.create("test");
    const item: CompletionItem = {
      kind: CompletionItemKind.Property,
      label: 'test',
      insertText: 'getInsertTextForProperty',
      insertTextFormat: InsertTextFormat.Snippet,
      filterText: 'getFilterTextForValue',
      documentation: 'documentation',
    };
    const completionItems: CompletionItem[] = [];
    completionItems.push(item);
    // return CompletionList.create(completionItems, false);
    return Promise.resolve(CompletionList.create(completionItems, false));
  }

  private static setupAjv(): Ajv.Ajv {
    const ajvOpts: Ajv.Options = {
      meta: true,
      schemaId: 'auto',
      allErrors: true,
      jsonPointers: true,
      unknownFormats: 'ignore',
    };
    const ajv = new Ajv(ajvOpts);
    ajv.addMetaSchema(jsonSpecV4);
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    ajv._opts.defaultMeta = jsonSpecV4.id;
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    ajv._refs['http://json-schema.org/schema'] = 'http://json-schema.org/draft-04/schema';
    return ajv;
  }

  private static compileAjv(ajv: Ajv.Ajv, text: string): Ajv.ValidateFunction {
    if (isAsyncDoc(text)) {
      return ajv.compile(asyncapiSchemaJson);
    }
    return ajv.compile(openapiSchemaJson);
  }
}
