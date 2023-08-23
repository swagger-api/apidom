import { pipe, replace } from 'ramda';

// escape :: String -> String
const escape = pipe(replace(/~/g, '~0'), replace(/\//g, '~1'), encodeURIComponent);

export default escape;
