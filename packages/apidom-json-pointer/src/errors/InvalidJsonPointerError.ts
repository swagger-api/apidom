export default class InvalidJsonPointerError extends Error {
  constructor(pointer: string) {
    super(`Invalid $ref pointer "${pointer}". Pointers must begin with "/"`);
  }
}
