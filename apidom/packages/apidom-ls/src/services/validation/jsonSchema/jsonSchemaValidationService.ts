import Ajv from 'ajv';
import * as jsonSpecV4 from 'ajv/lib/refs/json-schema-draft-04.json';

import { Diagnostic, DiagnosticSeverity, Range, Position } from 'vscode-languageserver-types';
import { LanguageSettings, ValidationContext } from 'apidom-ls/src/apidomLanguageTypes';
import jsonSourceMap from 'json-source-map';
import * as openapiSchemaJson from './openapiSchema.json';
import * as asyncapiSchemaJson from './asyncapiSchema.json';
import { isAsyncDoc } from '../../../parserFactory';

export interface JsonSchemaValidationService {
  validate(
    text: string,
    validationResult: Diagnostic[],
    validationContext?: ValidationContext,
  ): void;

  configure(settings: LanguageSettings): void;
}

export class DefaultJsonSchemaValidationService implements JsonSchemaValidationService {
  private validationEnabled: boolean | undefined;

  private commentSeverity: DiagnosticSeverity | undefined;

  public constructor() {
    this.validationEnabled = true;
  }

  public configure(settings?: LanguageSettings): void {
    if (settings) {
      this.validationEnabled = settings.validate;
    }
  }

  public validate(
    textDocument: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validationResult: Diagnostic[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validationContext?: ValidationContext,
  ): void {
    if (!this.validationEnabled) {
      return;
    }
    const ajv = DefaultJsonSchemaValidationService.setupAjv();
    const validateFunction = DefaultJsonSchemaValidationService.compileAjv(ajv, textDocument);

    const jsonDoc = JSON.parse(textDocument);

    const valid = validateFunction(jsonDoc);
    if (!valid) {
      const sourceMap = jsonSourceMap.stringify(jsonDoc, null, 2);
      if (validateFunction.errors) {
        validateFunction.errors.forEach((error) => {
          const errorPointer = sourceMap.pointers[error.dataPath];
          const range = Range.create(
            Position.create(errorPointer.value.line, errorPointer.value.column),
            Position.create(errorPointer.valueEnd.line, errorPointer.valueEnd.column),
          );
          validationResult.push(
            Diagnostic.create(range, error.message || '', DiagnosticSeverity.Error, 0),
          );
        });
      }
    }
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
