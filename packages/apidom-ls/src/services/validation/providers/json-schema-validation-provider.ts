import Ajv2020 from 'ajv/dist/2020';
import Ajv from 'ajv';
import { Diagnostic, DiagnosticSeverity, Position, Range } from 'vscode-languageserver-types';
import jsonSourceMap from 'json-source-map';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Element } from '@swagger-api/apidom-core';

import { positionRangeForPath } from '../utils/ast';
import {
  LanguageSettings,
  MergeStrategy,
  NamespaceVersion,
  ValidationContext,
  ValidationProvider,
  ValidationProviderResult,
} from '../../../apidom-language-types';
import * as AjvUtils from './ajv-utils';
import { isJsonDoc } from '../../../utils/utils';

// eslint-disable-next-line import/prefer-default-export
export abstract class JsonSchemaValidationProvider implements ValidationProvider {
  private validationEnabled: boolean | undefined;

  protected ajv: Ajv2020 | Ajv;

  private jsonSchema: Record<string, unknown>;

  protected ajv2020: boolean;

  protected constructor(ajv2020: boolean, jsonSchema: Record<string, unknown>) {
    this.validationEnabled = true;
    this.jsonSchema = jsonSchema;
    this.ajv2020 = ajv2020;
    this.ajv = AjvUtils.ajv(ajv2020);
  }

  public async doValidation(
    textDocument: TextDocument,
    api: Element,
    currentDiagnostics: Diagnostic[],
    validationContext?: ValidationContext,
  ): Promise<ValidationProviderResult> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const text = textDocument.getText();
    const isYaml = !(await isJsonDoc(text));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise<ValidationProviderResult>((resolve, reject) => {
      const diagnostics: Diagnostic[] = [];

      // get the serialized apidom JSON if doc is yaml
      let jsonText = text;
      if (isYaml) {
        jsonText = JSON.stringify(api.toValue());
      }
      this.validate(jsonText, text, isYaml, diagnostics, validationContext);
      const result: ValidationProviderResult = {
        diagnostics,
        mergeStrategy: MergeStrategy.PREPEND,
      };
      // eslint-disable-next-line no-promise-executor-return
      return resolve(result);
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
    const validateFunction = AjvUtils.compileAjv(this.jsonSchema, this.ajv2020);
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
          const errorOnValue =
            error.keyword === 'pattern' ||
            error.keyword === 'format' ||
            error.keyword === 'errorMessage';
          // if errors are related to root, mark only the first char
          if (!error.instancePath || error.instancePath.length === 0) {
            const endChar = !originalDocument || originalDocument.length === 0 ? 0 : 1;
            range = Range.create(Position.create(0, 0), Position.create(0, endChar));
          }
          // TODO fix and solve with consistent YAML / JSON / Adapter
          else if (isYaml) {
            // eslint-disable-next-line prefer-template
            const position = positionRangeForPath(
              originalDocument,
              error.instancePath.replace(/\/$/, '').replace(/^"/, '').replace(/^\//, '').split('/'),
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
            const errorPointer = sourceMap.pointers[error.instancePath];
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
            this.name(),
          );
          diagnostics.push(diagnostic);
        });
      }
    }
  }

  public abstract break(): boolean;

  public abstract namespaces(): NamespaceVersion[];

  public abstract name(): string;
}
