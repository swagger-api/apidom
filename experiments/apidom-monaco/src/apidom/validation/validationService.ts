import {getSourceMap, ValidationResult} from "../utils/objects";
import {JSONSchemaValidationService, NoOpSchemaCollector} from "./schema/jsonSchemaValidationService";
import {openapiSchemaString} from "./schema/openapiSchemaString.js";
import {asyncapiSchemaString} from "./schema/asyncapiSchemaString.js";
import {JSONSchema} from "./schema/jsonSchema";
import $RefParser from "@apidevtools/json-schema-ref-parser";
import {DocumentLanguageSettings, TextDocument, Diagnostic, Range} from '../languageServiceTypes';

// @ts-ignore
import ApiDOMParser from "apidom-parser";
// @ts-ignore
import * as openapi3_1Adapter from "apidom-parser-adapter-openapi3-1-json";
// @ts-ignore
import * as asyncapi2_0Adapter from "apidom-parser-adapter-asyncapi2-0-json";
// @ts-ignore
import {namespace} from 'apidom-parser-adapter-openapi3-1-json';
// @ts-ignore
import {namespace as namespaceAsync} from 'apidom-parser-adapter-asyncapi2-0-json';
import {DiagnosticSeverity} from '../languageServiceTypes'
import {getParser, isAsyncDoc} from "../apidomLanguageService";


export interface IValidationService {

    validate(node: Element, validationResult: ValidationResult, schema: JSONSchema): void;

    doValidation(textDocument: TextDocument, documentSettings?: DocumentLanguageSettings): Thenable<Diagnostic[]>;

}

export class ValidationService implements IValidationService {

    public doValidation(textDocument: TextDocument, documentSettings?: DocumentLanguageSettings): Thenable<Diagnostic[]> {

        const parser = getParser(textDocument);
        let text: string = textDocument.getText();

        return parser.parse(text, {sourceMap: true}).then(
            result => {
                const api: namespace.Element = result.api
                api.freeze() // !! freeze and add parent !!

                const validationResult: ValidationResult = new ValidationResult();
                for (const annotation of result.annotations) {
                    const nodeSourceMap = getSourceMap(annotation);
                    let location = {offset: nodeSourceMap.offset, length: 1};
                    validationResult.problems.push({
                        location: location,
                        severity: DiagnosticSeverity.Error,
                        message: annotation.toValue()
                    });
                }

                let schemaJs;
                if (isAsyncDoc(textDocument)) {
                    schemaJs = JSON.parse(asyncapiSchemaString) as $RefParser.JSONSchema;
                } else {
                    schemaJs = JSON.parse(openapiSchemaString) as $RefParser.JSONSchema;
                }

                return $RefParser.dereference(schemaJs).then(s => {
                    let schema: JSONSchema = s as JSONSchema;


                    this.validate(api, validationResult, schema);

                    return validationResult.problems.map(p => {
                        let range = Range.create(textDocument.positionAt(p.location.offset), textDocument.positionAt(p.location.offset + p.location.length));
                        return Diagnostic.create(range, p.message, p.severity, p.code);
                    });

                });
            }
        );
    }

    public validate(node: Element, validationResult: ValidationResult, schema: JSONSchema) {

        let jsonSchemaValidationService = new JSONSchemaValidationService();
        let matchingSchemas = NoOpSchemaCollector.instance;
        jsonSchemaValidationService.validate(node, schema, validationResult, matchingSchemas);
    }

}
