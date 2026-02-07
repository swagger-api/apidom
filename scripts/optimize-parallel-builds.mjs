#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packagesDir = path.join(__dirname, '..', 'packages');

function updatePackageJson(packageJsonPath) {
  const content = fs.readFileSync(packageJsonPath, 'utf8');
  const packageJson = JSON.parse(content);
  let updated = false;

  if (packageJson.scripts?.build) {
    const oldBuild = packageJson.scripts.build;
    // Change default from 2 to 6 cores for package-level parallelization
    const newBuild = oldBuild.replace(/\$\{CPU_CORES:-2\}/g, '${CPU_CORES:-6}');

    if (oldBuild !== newBuild) {
      packageJson.scripts.build = newBuild;
      updated = true;
    }
  }

  if (updated) {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8');
    return true;
  }
  return false;
}

async function main() {
  const packages = fs.readdirSync(packagesDir);
  let updatedCount = 0;

  for (const pkg of packages) {
    const packagePath = path.join(packagesDir, pkg);

    if (!fs.statSync(packagePath).isDirectory()) {
      continue;
    }

    const packageJsonPath = path.join(packagePath, 'package.json');

    if (!fs.existsSync(packageJsonPath)) {
      continue;
    }

    if (updatePackageJson(packageJsonPath)) {
      console.log(`✓ ${pkg}: Updated CPU_CORES default from 2 to 6`);
      updatedCount++;
    }
  }

  console.log(`\n✓ Updated ${updatedCount} package(s)`);
}

main().catch(console.error);
