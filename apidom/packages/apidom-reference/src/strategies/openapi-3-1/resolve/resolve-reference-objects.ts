// import { Element, filter } from 'apidom';
//
// import { isExternalReferenceElement } from '../predicates';

/**
 * 1.) Compute base URI
 * 2.) Find external Reference elements
 * 3.) For each Reference element:
 *   3.1.) Fetch Reference element content
 *   3.2.) Parse Reference element content
 *   3.3.) Repeat with 1.)
 *
 * 1.) Base URI is either provided from outside or determined by CWD.
 * 2.) Root References are found by using namespace predicates. Tree structure
 *     is created and all non-root References are assigned as direct
 */

// interface ResolveOptions {
//   maxDepth?: number;
// }
//
// const resolve = <T extends Element>(element: T, options: ResolveOptions = {}): unknown => {
//   const externalReferences = filter(isExternalReferenceElement)(element);
// };
//
// export default resolve;
