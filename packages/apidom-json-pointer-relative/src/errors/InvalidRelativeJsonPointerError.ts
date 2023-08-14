export default class InvalidRelativeJsonPointerError extends Error {
  constructor(relativePointer: string) {
    super(`Invalid Relative JSON Pointer "${relativePointer}".`);
  }
}
