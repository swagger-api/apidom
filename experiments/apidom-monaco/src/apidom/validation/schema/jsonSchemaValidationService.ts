// @ts-ignore
import {namespace} from 'apidom-parser-adapter-openapi3-1-json';
import {JSONSchema} from './jsonSchema';
import {contains, ErrorCode, getSourceMap, isBoolean, ValidationResult} from "../../utils/objects";
// @ts-ignore
import {isArrayElement, isMemberElement, isNumberElement, isObjectElement, isStringElement,} from 'apidom';
import {DiagnosticSeverity} from '../../languageServiceTypes'


export interface IApplicableSchema {
    node: namespace.Element;
    inverted?: boolean;
    schema: JSONSchema;
}

export interface ISchemaCollector {
    schemas: IApplicableSchema[];

    add(schema: IApplicableSchema): void;

    merge(other: ISchemaCollector): void;

    include(node: namespace.Element): boolean;

    newSub(): ISchemaCollector;
}

export class SchemaCollector implements ISchemaCollector {
    schemas: IApplicableSchema[] = [];

    constructor(private focusOffset = -1, private exclude: namespace.Element | null = null) {
    }

    add(schema: IApplicableSchema) {
        this.schemas.push(schema);
    }

    merge(other: ISchemaCollector) {
        this.schemas.push(...other.schemas);
    }

    include(node: namespace.Element) {
        return (this.focusOffset === -1 || contains(node, this.focusOffset)) && (node !== this.exclude);
    }

    newSub(): ISchemaCollector {
        return new SchemaCollector(-1, this.exclude);
    }
}

export class NoOpSchemaCollector implements ISchemaCollector {
    private constructor() {
    }

    get schemas() {
        return [];
    }

    add(schema: IApplicableSchema) {
    }

    merge(other: ISchemaCollector) {
    }

    include(node: namespace.Element) {
        return true;
    }

    newSub(): ISchemaCollector {
        return this;
    }

    static instance = new NoOpSchemaCollector();
}


export interface IJSONSchemaValidationService {

    validate(node: namespace.Element, schema: JSONSchema, validationResult: ValidationResult, matchingSchemas: ISchemaCollector): void;

}


export class JSONSchemaValidationService implements IJSONSchemaValidationService {

    public validate(node: namespace.Element, schema: JSONSchema, validationResult: ValidationResult, matchingSchemas: ISchemaCollector) {
        validate(node, schema, validationResult, matchingSchemas);
    }
}

function validate(node: namespace.Element, schema: JSONSchema, validationResult: ValidationResult, matchingSchemas: ISchemaCollector) {

    if (!node || !matchingSchemas.include(node)) {
        return;
    }

    if (isMemberElement(node)) {
        validate(<Element>(<namespace.MemberElement>node).value, schema, validationResult, matchingSchemas);
    } else if (isObjectElement(node)) {
        _validateObjectNode(<namespace.ObjectElement>node, schema, validationResult, matchingSchemas);
    } else if (isArrayElement(node)) {
        _validateArrayNode(<namespace.ArrayElement>node, schema, validationResult, matchingSchemas);
    } else if (isStringElement(node)) {
        _validateStringNode(node, schema, validationResult, matchingSchemas);
    } else if (isNumberElement(node)) {
        _validateNumberNode(node, schema, validationResult, matchingSchemas);
    } else {
        _validateNode();
        matchingSchemas.add({node: node, schema: schema});
    }

    function _validateNode() {

    }

    function _validateObjectNode(node: namespace.ObjectElement, schema: JSONSchema, validationResult: ValidationResult, matchingSchemas: ISchemaCollector): void {
        let seenKeys: { [key: string]: namespace.Element } = Object.create(null);
        let unprocessedProperties: string[] = [];
        for (const propertyNode of node) {
            let key = propertyNode.key.toValue();
            seenKeys[key] = propertyNode.value;
            unprocessedProperties.push(key);
        }

        if (Array.isArray(schema.required)) {
            for (const propertyName of schema.required) {
                if (!seenKeys[propertyName]) {
                    let keyNode: namespace.Element = <Element>(node.parent && isMemberElement(node.parent) && (<namespace.MemberElement>node.parent).key);
                    const nodeSourceMap = getSourceMap(node);
                    let location = {offset: nodeSourceMap.offset, length: 1};
                    if (keyNode) {
                        const keySourceMap = getSourceMap(keyNode);
                        location = {offset: keySourceMap.offset, length: keySourceMap.length};
                    }
                    const propSchema = schema.properties[propertyName];
                    const propValue = "string" == propSchema.type ? '""' : '{}';
                    validationResult.problems.push({
                        location: location,
                        severity: DiagnosticSeverity.Warning,
                        code: ErrorCode.PropertyExpected,
                        message: 'Missing property ' + propertyName,
                        quickFix: "\n    \"" + propertyName + "\": " + propValue + ",",
                        quickFixLocation: {offset: nodeSourceMap.offset, length: 1},
                        jsonSchema: propSchema
                    });
                }
            }
        }

        let propertyProcessed = (prop: string) => {
            let index = unprocessedProperties.indexOf(prop);
            while (index >= 0) {
                unprocessedProperties.splice(index, 1);
                index = unprocessedProperties.indexOf(prop);
            }
        };

        if (schema.properties) {
            for (const propertyName of Object.keys(schema.properties)) {
                propertyProcessed(propertyName);
                let propertySchema = schema.properties[propertyName];
                let child = seenKeys[propertyName];

                if (child) {
                    if (isBoolean(propertySchema)) {
                        if (!propertySchema) {
                            let propertyNode = <namespace.MemberElement>child.parent;
                            const keySourceMap = getSourceMap(<Element>propertyNode.key);
                            validationResult.problems.push({
                                location: {offset: keySourceMap.offset, length: keySourceMap.length},
                                severity: DiagnosticSeverity.Warning,
                                message: schema.errorMessage || "Property " + propertyName + "is not allowed."
                            });
                        } else {
                            validationResult.propertiesMatches++;
                            validationResult.propertiesValueMatches++;
                        }
                    } else {
                        let propertyValidationResult = new ValidationResult();
                        validate(child, propertySchema, propertyValidationResult, matchingSchemas);
                        validationResult.mergePropertyMatch(propertyValidationResult);
                    }
                }

            }
        }

    }

    function _validateArrayNode(node: namespace.ArrayElement, schema: JSONSchema, validationResult: ValidationResult, matchingSchemas: ISchemaCollector): void {
        //console.log("_validateArrayNode");
    }

    function _validateStringNode(node: namespace.StringElement, schema: JSONSchema, validationResult: ValidationResult, matchingSchemas: ISchemaCollector): void {
        //console.log("_validateStringNode");
    }

    function _validateNumberNode(node: namespace.NumberElement, schema: JSONSchema, validationResult: ValidationResult, matchingSchemas: ISchemaCollector): void {
        //console.log("_validateNumberNode");
    }
}

