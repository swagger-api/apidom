import { NamespaceVersion } from '../../../apidom-language-types.ts';

export const JSONSchema202012 = [{ namespace: 'json-schema', version: '2020-12' }];

export const assoc =
  (targetSpecs: NamespaceVersion[]) =>
  <T>(rule: T): T => ({
    ...rule,
    targetSpecs,
  });

const replaceElement = (value: unknown, element: string): unknown => {
  if (Array.isArray(value)) {
    return value.map((item) => replaceElement(item, element));
  }
  return value === 'JSONSchema202012' ? element : value;
};

export const assocElement =
  (element: string) =>
  <T>(rule: T): T => {
    const { linterParams } = rule as { linterParams?: unknown };
    if (!Array.isArray(linterParams)) {
      return rule;
    }
    return { ...rule, linterParams: replaceElement(linterParams, element) };
  };

export const compose = <T>(rules: ReadonlyArray<T | T[]>, transformer?: (rule: T) => T) => {
  if (typeof transformer === 'function') {
    return (rules.flat(+Infinity) as T[]).map(transformer);
  }
  return rules.flat();
};
