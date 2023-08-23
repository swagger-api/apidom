import { pipe, replace } from 'ramda';

/**
 * decodeURIComponent can throw URIError in certain cases like 'c%d'.
 * safeDecodeURIComponent is a safe variant of decodeURIComponent that never trows.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Malformed_URI|More info about URIError}
 */
const safeDecodeURIComponent = (encodedURIComponent: string): string => {
  try {
    return decodeURIComponent(encodedURIComponent);
  } catch {
    return encodedURIComponent;
  }
};

// unescape :: String -> String
const unescape = pipe(replace(/~1/g, '/'), replace(/~0/g, '~'), safeDecodeURIComponent);

export default unescape;
