import {
  Namespace,
  ParseResultElement,
  isParseResultElement,
  namespace as baseNamespace,
} from '@swagger-api/apidom-core';

import ParserError from '../../../errors/ParserError';
import Parser, { ParserOptions } from '../Parser';
import File from '../../../File';

export interface ApiDOMJSONParserOptions extends Omit<ParserOptions, 'name'> {
  readonly namespace?: Namespace;
}

class ApiDOMJSONParser extends Parser {
  public namespace: Namespace;

  public ['apidom-json']!: { namespace?: Namespace };

  constructor(options?: ApiDOMJSONParserOptions) {
    const {
      fileExtensions = ['.json'],
      mediaTypes = ['application/vnd.apidom', 'application/vnd.apidom+json'],
      namespace = baseNamespace,
      ...rest
    } = options ?? {};

    super({ ...rest, name: 'apidom-json', fileExtensions, mediaTypes });
    this.namespace = namespace;
  }

  canParse(file: File): boolean {
    const hasSupportedFileExtension =
      this.fileExtensions.length === 0 ? true : this.fileExtensions.includes(file.extension);
    const hasSupportedMediaType = this.mediaTypes.includes(file.mediaType);

    if (!hasSupportedFileExtension) return false;
    if (hasSupportedMediaType) return true;
    if (!hasSupportedMediaType) {
      try {
        return this.namespace.fromRefract(JSON.parse(file.toString())) && true;
      } catch {
        return false;
      }
    }
    return false;
  }

  parse(file: File): ParseResultElement {
    const source = file.toString();
    const namespace = this['apidom-json']?.namespace ?? this.namespace;

    // allow empty files
    if (this.allowEmpty && source.trim() === '') {
      return new ParseResultElement();
    }

    try {
      const element = namespace.fromRefract(JSON.parse(source));

      if (!isParseResultElement(element)) {
        element.classes.push('result');
        return new ParseResultElement([element]);
      }

      return element;
    } catch (error: unknown) {
      throw new ParserError(`Error parsing "${file.uri}"`, { cause: error });
    }
  }
}

export default ApiDOMJSONParser;
