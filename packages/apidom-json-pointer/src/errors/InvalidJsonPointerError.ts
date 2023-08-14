export default class InvalidJsonPointerError extends Error {
  constructor(pointer: string) {
    super(`Invalid JSON Pointer "${pointer}". Pointers must begin with "/"`);
  }
}
