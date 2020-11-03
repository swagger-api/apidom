import { pathEq, curry, anyPass, filter } from 'ramda';

// hasKey :: String -> JsonProperty -> Boolean
export const hasKey = pathEq(['key', 'value']);

// hasKeys :: [String] -> [JsonProperty] -> Boolean
export const hasKeys = curry((keyNames, properties) => {
  const predicates = keyNames.map((keyName: string) => hasKey(keyName));
  return filter(anyPass(predicates), properties).length === keyNames.length;
});
