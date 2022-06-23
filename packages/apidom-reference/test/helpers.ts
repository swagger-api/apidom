import fs from 'node:fs';

export const loadFile = (uri: string) => fs.readFileSync(uri).toString();

export const loadJsonFile = (uri: string) => JSON.parse(loadFile(uri));
