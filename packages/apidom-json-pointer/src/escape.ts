import { pipe, replace } from 'ramda';

/**
 * @public
 */
const escape = pipe(replace(/~/g, '~0'), replace(/\//g, '~1'), encodeURIComponent);

export default escape;
