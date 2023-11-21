import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const cwd = process.cwd();
const [, , fileName, bofContent] = process.argv;
const filePath = path.join(cwd, fileName);
const fileContent = fs.readFileSync(filePath).toString();
const lines = fileContent.split('\n');

lines.shift();
lines.unshift(bofContent);

const newFileContent = lines.join('\n');
fs.writeFileSync(fileName, newFileContent);
