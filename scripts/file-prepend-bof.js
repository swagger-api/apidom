import fs from 'node:fs';
import path from 'node:path';
import { Buffer } from 'node:buffer';
import process from 'node:process';

const cwd = process.cwd();
const [, , fileName, bofContent] = process.argv;
const filePath = path.join(cwd, fileName);
const fileContent = fs.readFileSync(filePath);
const fileDescriptor = fs.openSync(filePath, 'w+');
const prependContent = Buffer.from(`${bofContent}\n`);

fs.writeSync(fileDescriptor, prependContent, 0, prependContent.length, 0);
fs.writeSync(fileDescriptor, fileContent, 0, fileContent.length, prependContent.length);
fs.closeSync(fileDescriptor);
