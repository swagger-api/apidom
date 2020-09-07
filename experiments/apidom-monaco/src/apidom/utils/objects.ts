// @ts-ignore
import {namespace} from 'apidom-parser-adapter-openapi3-1-json';
import {DiagnosticSeverity} from '../languageServiceTypes'
// @ts-ignore
import {isMemberElement, ArraySlice} from 'apidom'
export function equals(one: any, other: any): boolean {
    if (one === other) {
        return true;
    }
    if (one === null || one === undefined || other === null || other === undefined) {
        return false;
    }
    if (typeof one !== typeof other) {
        return false;
    }
    if (typeof one !== 'object') {
        return false;
    }
    if ((Array.isArray(one)) !== (Array.isArray(other))) {
        return false;
    }

    var i: number,
        key: string;

    if (Array.isArray(one)) {
        if (one.length !== other.length) {
            return false;
        }
        for (i = 0; i < one.length; i++) {
            if (!equals(one[i], other[i])) {
                return false;
            }
        }
    } else {
        var oneKeys: string[] = [];

        for (key in one) {
            oneKeys.push(key);
        }
        oneKeys.sort();
        var otherKeys: string[] = [];
        for (key in other) {
            otherKeys.push(key);
        }
        otherKeys.sort();
        if (!equals(oneKeys, otherKeys)) {
            return false;
        }
        for (i = 0; i < oneKeys.length; i++) {
            if (!equals(one[oneKeys[i]], other[oneKeys[i]])) {
                return false;
            }
        }
    }
    return true;
}

export function isNumber(val: any): val is number {
    return typeof val === 'number';
}

export function isDefined(val: any): val is object {
    return typeof val !== 'undefined';
}

export function isBoolean(val: any): val is boolean {
    return typeof val === 'boolean';
}

export function isString(val: any): val is string {
    return typeof val === 'string';
}

export class SourceMap {
    constructor(offset: number, length: number, line: number, column: number,
                endLine?: number,
                endColumn?: number,
                endOffset?: number) {
        this.length = length;
        this.offset = offset;
        this.line = line;
        this.column = column;
        this.endLine = endLine;
        this.endColumn = endColumn;
        this.endOffset = endOffset;
    }

    offset: number;
    length: number;
    line: number;
    column: number;
    endLine: number;
    endColumn: number;
    endOffset: number;

}

export interface Result {
    valid: Boolean,
    errors: any

}

export interface IRange {
    offset: number;
    length: number;
}

export interface IProblem {
    location: IRange;
    severity: DiagnosticSeverity;
    code?: ErrorCode;
    message: string;
}

export enum ErrorCode {
    Undefined = 0,
    EnumValueMismatch = 1,
    UnexpectedEndOfComment = 0x101,
    UnexpectedEndOfString = 0x102,
    UnexpectedEndOfNumber = 0x103,
    InvalidUnicode = 0x104,
    InvalidEscapeCharacter = 0x105,
    InvalidCharacter = 0x106,
    PropertyExpected = 0x201,
    CommaExpected = 0x202,
    ColonExpected = 0x203,
    ValueExpected = 0x204,
    CommaOrCloseBacketExpected = 0x205,
    CommaOrCloseBraceExpected = 0x206,
    TrailingComma = 0x207,
    DuplicateKey = 0x208,
    CommentNotPermitted = 0x209,
    SchemaResolveError = 0x300
}

export enum EnumMatch {
    Key, Enum
}

export class ValidationResult {
    public problems: IProblem[];

    public propertiesMatches: number;
    public propertiesValueMatches: number;
    public primaryValueMatches: number;
    public enumValueMatch: boolean;
    public enumValues: any[] | null;

    constructor() {
        this.problems = [];
        this.propertiesMatches = 0;
        this.propertiesValueMatches = 0;
        this.primaryValueMatches = 0;
        this.enumValueMatch = false;
        this.enumValues = null;
    }

    public hasProblems(): boolean {
        return !!this.problems.length;
    }

    public mergeAll(validationResults: ValidationResult[]): void {
        for (const validationResult of validationResults) {
            this.merge(validationResult);
        }
    }

    public merge(validationResult: ValidationResult): void {
        this.problems = this.problems.concat(validationResult.problems);
    }

    public mergeEnumValues(validationResult: ValidationResult): void {
        if (!this.enumValueMatch && !validationResult.enumValueMatch && this.enumValues && validationResult.enumValues) {
            this.enumValues = this.enumValues.concat(validationResult.enumValues);
            for (let error of this.problems) {
                if (error.code === ErrorCode.EnumValueMismatch) {
                    error.message = 'Value is not accepted. Valid values: ' + this.enumValues.map(v => JSON.stringify(v)).join(', ') + ".";
                }
            }
        }
    }

    public mergePropertyMatch(propertyValidationResult: ValidationResult): void {
        this.merge(propertyValidationResult);
        this.propertiesMatches++;
        if (propertyValidationResult.enumValueMatch || !propertyValidationResult.hasProblems() && propertyValidationResult.propertiesMatches) {
            this.propertiesValueMatches++;
        }
        if (propertyValidationResult.enumValueMatch && propertyValidationResult.enumValues && propertyValidationResult.enumValues.length === 1) {
            this.primaryValueMatches++;
        }
    }

    public compare(other: ValidationResult): number {
        let hasProblems = this.hasProblems();
        if (hasProblems !== other.hasProblems()) {
            return hasProblems ? -1 : 1;
        }
        if (this.enumValueMatch !== other.enumValueMatch) {
            return other.enumValueMatch ? -1 : 1;
        }
        if (this.primaryValueMatches !== other.primaryValueMatches) {
            return this.primaryValueMatches - other.primaryValueMatches;
        }
        if (this.propertiesValueMatches !== other.propertiesValueMatches) {
            return this.propertiesValueMatches - other.propertiesValueMatches;
        }
        return this.propertiesMatches - other.propertiesMatches;
    }

}



export function contains(node: namespace.Element, offset: number, includeRightBound = false): boolean {
    const nodeSourceMap = getSourceMap(node);
    return offset >= nodeSourceMap.offset && offset < (nodeSourceMap.offset + nodeSourceMap.length) || includeRightBound && offset === (nodeSourceMap.offset + nodeSourceMap.length);
}

export function getSourceMap(element: namespace.Element): SourceMap {
    if (element && element.meta && element.meta.get('sourceMap')) {
        const sourceMap: [][number] = element.meta.get('sourceMap').toValue() as [][number];
        const offset = sourceMap[0][2];
        const length = sourceMap[1][2] - sourceMap[0][2];
        const line = sourceMap[0][0];
        const column = sourceMap[0][1];
        const endLine = sourceMap[1][0];
        const endColumn = sourceMap[1][1];
        const endOffset = sourceMap[1][2];
        return new SourceMap(offset, length, line, column, endLine, endColumn, endOffset); // TODO ???
    } else {
        return new SourceMap(1, 2, 0, 1); // TODO ???
    }

}




/**
 * Finds the most inner node at the given offset. If includeRightBound is set, also finds nodes that end at the given offset.
 */
export function findNodeAtOffset(node: namespace.Element, offset: number, includeRightBound = false): namespace.Element | undefined {
    if (contains(node, offset, includeRightBound)) {
        const children = node.children.elements;
        if (Array.isArray(children)) {
            for (let i = 0; i < children.length && getSourceMap(children[i]).offset <= offset; i++) {
                const item = findNodeAtOffset(children[i], offset, includeRightBound);
                if (item) {
                    return item;
                }
            }

        }
        return node;
    }
    return undefined;
}


/*
    FROM HERE PROBABLY NOT USED, OBSOLETE TODO DELETE

 */

export function findElementsWithClasses(el: namespace.Element, elementNames: string[]) {
    if (arguments.length > 1 && !el.isFrozen) {
        throw new Error('Cannot find recursive with multiple element names without first freezing the element. Call `element.freeze()`');
    }
    let elements = new ArraySlice();

    const append = (array, element) => {
        array.push(element);
        return array;
    };

    const checkElement = (array, element) => {
        if (elementNames.some(i => element.classes.toValue().includes(i))){
            array.push(element);
        }
        const items = findElementsWithClasses(element, elementNames);
        if (items) {
            items.reduce(append, array);
        }

        if (isMemberElement(element)) {
            if (element.content.key) {
                checkElement(array, element.content.key);
            }

            if (element.content.value) {
                checkElement(array, element.content.value);
            }
        }

        return array;
    };

    if (el.content) {
        if (el.content.element) {
            checkElement(elements, el.content);
        }

        if (Array.isArray(el.content)) {
            el.content.reduce(checkElement, elements);
        }
    }

    return elements;
}

export function findTreeClasses(el: namespace.Element, elementNames: string[]) {

    const ar = findElementsWithClasses(el, elementNames);
    let res = [];
    if (ar && ar.elements) {
        ar.elements.forEach(e => {
            res = res.concat(e.classes.toValue());
        })
    }
    return Array.from(new Set(res));
}

export function findAllTreeClasses(el: namespace.Element) {

    const ar = findElementsWithClasses(el, allClasses());
    let elements = [];
    if (ar && ar.elements) {
        ar.elements.forEach(e => {
            elements = elements.concat(e.classes.toValue());
        })
    }

    let res = [];
    elements.forEach(e => {
        if (allClasses().includes(e)) {
            res.push(e);
        }
    })
    return Array.from(new Set(res));
}


export function findAllTreeElementsWithClasses(el: namespace.Element) {
    return findElementsWithClasses(el, allClasses());
}

export function allClasses(): string[] {
    return ["info", "version", "specVersion", "license", "operation", "pathItem", "httpMethod"];
}
