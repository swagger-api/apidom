import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const cwd = process.cwd();

if (!fs.existsSync(path.join(cwd, process.argv[2]))) {
  process.exit(1);
}
