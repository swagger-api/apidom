// eslint-disable-next-line import/prefer-default-export
export function printJson(json: unknown) {
  console.log(JSON.stringify(json, null, 2));
}
