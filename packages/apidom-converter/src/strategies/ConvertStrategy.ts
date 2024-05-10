import { ParseResultElement } from '@swagger-api/apidom-core';
import { File } from '@swagger-api/apidom-reference';

import type { ConverterOptions } from '../options';

export interface ConvertStrategyOptions {
  readonly name: string;
}

abstract class ConvertStrategy {
  public readonly name: string;

  protected constructor({ name }: ConvertStrategyOptions) {
    this.name = name;
  }

  abstract canConvert(file: File, options: ConverterOptions): boolean;

  abstract convert(file: File, options: ConverterOptions): Promise<ParseResultElement>;
}

export default ConvertStrategy;
