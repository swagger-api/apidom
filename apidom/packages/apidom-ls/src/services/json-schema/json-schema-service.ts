import Ajv from 'ajv';
import jsonSpecV4 from 'ajv/lib/refs/json-schema-draft-04.json';
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
import { Element } from 'apidom';

import { positionRangeForPath } from '../../utils/ast';
import { CompletionService } from '../completion/completion-service';
import {
  CompletionContext,
  LanguageSettings,
  ValidationContext,
} from '../../apidom-language-types';
import openapiSchemaJson from './openapi-schema.json';
import asyncapiSchemaJson from './asyncapi-schema.json';
import { isAsyncDoc, isJsonDoc } from '../../parser-factory';
import { ValidationProvider } from '../validation/validation-service';

// eslint-disable-next-line import/prefer-default-export
export class DefaultJsonSchemaService implements CompletionService, ValidationProvider {
  private validationEnabled: boolean | undefined;

  private commentSeverity: DiagnosticSeverity | undefined;

  private ajv: Ajv.Ajv;

  public constructor() {
    this.validationEnabled = true;
    this.ajv = DefaultJsonSchemaService.setupAjv();
  }

  public doValidation(
    textDocument: TextDocument,
    api: Element,
    validationContext?: ValidationContext,
  ): Promise<Diagnostic[]> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise<Diagnostic[]>((resolve, reject) => {
      const diagnostics: Diagnostic[] = [];

      // get the serialized apidom JSON if doc is yaml
      const text = textDocument.getText();
      let jsonText = text;
      const isYaml = !isJsonDoc(text);
      if (isYaml) {
        jsonText = JSON.stringify(api.toValue());
      }
      this.validate(jsonText, text, isYaml, diagnostics, validationContext);
      return resolve(diagnostics);
    });
  }

  public configure(settings?: LanguageSettings): void {
    if (settings) {
      this.validationEnabled = settings.validate;
    }
  }

  public validate(
    jsonDocument: string,
    originalDocument: string,
    isYaml: boolean,
    diagnostics: Diagnostic[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validationContext?: ValidationContext,
  ): void {
    if (!this.validationEnabled) {
      return;
    }

    const validateFunction = DefaultJsonSchemaService.compileAjv(this.ajv, jsonDocument);

    const jsonDoc = JSON.parse(jsonDocument);
    const valid = validateFunction(jsonDoc);
    if (!valid) {
      const sourceMap = jsonSourceMap.parse(jsonDocument, null, 2);
      if (validateFunction.errors) {
        validateFunction.errors.forEach((error) => {
          if (
            validationContext &&
            validationContext.maxNumberOfProblems &&
            diagnostics.length > validationContext.maxNumberOfProblems
          ) {
            return;
          }
          let range: Range;
          const errorOnValue = error.keyword === 'pattern' || error.keyword === 'format';
          // TODO fix and solve with consistent YAML / JSON / Adapter
          if (isYaml) {
            // eslint-disable-next-line prefer-template
            const position = positionRangeForPath(
              originalDocument,
              error.dataPath.replace(/\/$/, '').replace(/^"/, '').replace(/^\//, '').split('/'),
            );
            if (errorOnValue || !position.key_start) {
              range = Range.create(
                Position.create(position.start.line, position.start.column),
                Position.create(position.end.line, position.end.column),
              );
            } else {
              range = Range.create(
                Position.create(position.key_start.line, position.key_start.column),
                Position.create(position.key_end.line, position.key_end.column),
              );
            }
          } else {
            const errorPointer = sourceMap.pointers[error.dataPath];
            if (errorOnValue || !errorPointer.key) {
              range = Range.create(
                Position.create(errorPointer.value.line, errorPointer.value.column),
                Position.create(errorPointer.valueEnd.line, errorPointer.valueEnd.column),
              );
            } else {
              range = Range.create(
                Position.create(errorPointer.key.line, errorPointer.key.column),
                Position.create(errorPointer.keyEnd.line, errorPointer.keyEnd.column),
              );
            }
          }
          const diagnostic = Diagnostic.create(
            range,
            error.message || '',
            DiagnosticSeverity.Error,
            0,
          );
          diagnostics.push(diagnostic);
        });
      }
    }
  }

  // TODO
  // eslint-disable-next-line class-methods-use-this
  public doCompletion(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    textDocument: TextDocument,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    completionParamsOrPosition: CompletionParams | Position,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    completionContext?: CompletionContext,
  ): Promise<CompletionList> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const position =
      'position' in completionParamsOrPosition
        ? completionParamsOrPosition.position
        : completionParamsOrPosition;

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
    // TODO
    completionItems.push(item);
    // return CompletionList.create(completionItems, false);
    CompletionList.create(completionItems, false);
    // return Promise.resolve(CompletionList.create([], false));
    return Promise.resolve(CompletionList.create([], false));
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
