#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packagesDir = path.join(__dirname, '..', 'packages');

function updateViteConfig(viteConfigPath) {
  const content = fs.readFileSync(viteConfigPath, 'utf8');

  // Remove MINIFY environment variable
  const updated = content
    .replace(/const minify = process\.env\.MINIFY === 'true';\n\n/g, '')
    .replace(/,\n  minify,/g, ',');

  if (content !== updated) {
    fs.writeFileSync(viteConfigPath, updated, 'utf8');
    return true;
  }
  return false;
}

function updatePackageJson(packageJsonPath) {
  const content = fs.readFileSync(packageJsonPath, 'utf8');
  const packageJson = JSON.parse(content);

  if (packageJson.scripts && packageJson.scripts['build:umd:browser']) {
    const oldScript = packageJson.scripts['build:umd:browser'];
    const newScript = 'vite build';

    if (oldScript !== newScript && oldScript.includes('vite build')) {
      packageJson.scripts['build:umd:browser'] = newScript;
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8');
      return true;
    }
  }
  return false;
}

async function main() {
  const packages = fs.readdirSync(packagesDir);
  let viteConfigsUpdated = 0;
  let packageJsonsUpdated = 0;

  for (const pkg of packages) {
    const packagePath = path.join(packagesDir, pkg);

    if (!fs.statSync(packagePath).isDirectory()) {
      continue;
    }

    const viteConfigPath = path.join(packagePath, 'vite.config.ts');
    const packageJsonPath = path.join(packagePath, 'package.json');

    if (fs.existsSync(viteConfigPath)) {
      if (updateViteConfig(viteConfigPath)) {
        viteConfigsUpdated++;
      }
    }

    if (fs.existsSync(packageJsonPath)) {
      if (updatePackageJson(packageJsonPath)) {
        packageJsonsUpdated++;
        console.log(`✓ ${pkg}: Updated build script`);
      }
    }
  }

  console.log(`\n✓ Updated ${viteConfigsUpdated} vite.config.ts files`);
  console.log(`✓ Updated ${packageJsonsUpdated} package.json files`);
}

main().catch(console.error);
