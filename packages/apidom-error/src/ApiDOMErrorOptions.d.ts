export default interface ApiDOMErrorOptions extends ErrorOptions {
  readonly cause?: unknown;
  readonly [key: string]: unknown;
}
