#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packagesDir = path.join(__dirname, '..', 'packages');

function findEntry(packagePath) {
  const srcDir = path.join(packagePath, 'src');

  if (!fs.existsSync(srcDir)) {
    return null;
  }

  // Check for common entry points
  const possibleEntries = ['index.ts', 'parser.ts', 'adapter.ts'];

  for (const entry of possibleEntries) {
    if (fs.existsSync(path.join(srcDir, entry))) {
      return `./src/${entry}`;
    }
  }

  return null;
}

function updateViteConfig(viteConfigPath, correctEntry) {
  const content = fs.readFileSync(viteConfigPath, 'utf8');
  const updated = content.replace(
    /entry: '\.\/src\/[^']+'/,
    `entry: '${correctEntry}'`
  );

  if (content !== updated) {
    fs.writeFileSync(viteConfigPath, updated, 'utf8');
    return true;
  }
  return false;
}

async function main() {
  const packages = fs.readdirSync(packagesDir);
  let fixed = 0;

  for (const pkg of packages) {
    const packagePath = path.join(packagesDir, pkg);

    if (!fs.statSync(packagePath).isDirectory()) {
      continue;
    }

    const viteConfigPath = path.join(packagePath, 'vite.config.ts');

    if (!fs.existsSync(viteConfigPath)) {
      continue;
    }

    const correctEntry = findEntry(packagePath);

    if (!correctEntry) {
      console.log(`⚠️  ${pkg}: No entry file found, skipping`);
      continue;
    }

    if (updateViteConfig(viteConfigPath, correctEntry)) {
      console.log(`✓ ${pkg}: Updated entry to ${correctEntry}`);
      fixed++;
    }
  }

  console.log(`\n✓ Fixed ${fixed} package(s)`);
}

main().catch(console.error);
