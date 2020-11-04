import { isYamlScalar } from 'apidom-ast';
import { curry, filter, anyPass } from 'ramda';

// hasKey :: String -> YamlKeyValuePair -> Boolean
export const hasKey = curry((keyName, node) => {
  const { key } = node;

  if (!isYamlScalar(key)) {
    return false;
  }

  return key.content === keyName;
});

// hasKeys :: [String] -> [YamlKeyValuePair] -> Boolean
export const hasKeys = curry((keyNames, keyValuePairs) => {
  const predicates = keyNames.map((keyName: string) => hasKey(keyName));
  return filter(anyPass(predicates), keyValuePairs).length === keyNames.length;
});
