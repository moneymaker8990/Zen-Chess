#!/usr/bin/env node
// ============================================
// VERSION BUMP SCRIPT
// Syncs version across package.json, Android, and iOS
// ============================================
// Usage:
//   node scripts/bump-version.mjs patch    # 1.0.0 -> 1.0.1
//   node scripts/bump-version.mjs minor    # 1.0.0 -> 1.1.0
//   node scripts/bump-version.mjs major    # 1.0.0 -> 2.0.0
//   node scripts/bump-version.mjs 1.2.3    # Set specific version

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// File paths
const PACKAGE_JSON = path.join(rootDir, 'package.json');
const BUILD_GRADLE = path.join(rootDir, 'android', 'app', 'build.gradle');
const PBXPROJ = path.join(rootDir, 'ios', 'App', 'App.xcodeproj', 'project.pbxproj');

/**
 * Parse semantic version string
 */
function parseVersion(version) {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)$/);
  if (!match) {
    throw new Error(`Invalid version format: ${version}`);
  }
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
  };
}

/**
 * Bump version based on type
 */
function bumpVersion(current, type) {
  const v = parseVersion(current);

  switch (type) {
    case 'major':
      return `${v.major + 1}.0.0`;
    case 'minor':
      return `${v.major}.${v.minor + 1}.0`;
    case 'patch':
      return `${v.major}.${v.minor}.${v.patch + 1}`;
    default:
      // Assume it's a specific version string
      parseVersion(type); // Validate format
      return type;
  }
}

/**
 * Calculate build number from version
 * Format: MAJOR * 10000 + MINOR * 100 + PATCH
 * e.g., 1.2.3 -> 10203
 */
function versionToBuildNumber(version) {
  const v = parseVersion(version);
  return v.major * 10000 + v.minor * 100 + v.patch;
}

/**
 * Update package.json
 */
function updatePackageJson(newVersion) {
  const content = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf8'));
  const oldVersion = content.version;
  content.version = newVersion;
  fs.writeFileSync(PACKAGE_JSON, JSON.stringify(content, null, 2) + '\n');
  return oldVersion;
}

/**
 * Update Android build.gradle
 */
function updateAndroidVersion(newVersion, buildNumber) {
  let content = fs.readFileSync(BUILD_GRADLE, 'utf8');

  // Update versionCode
  content = content.replace(
    /versionCode\s+\d+/,
    `versionCode ${buildNumber}`
  );

  // Update versionName
  content = content.replace(
    /versionName\s+"[^"]+"/,
    `versionName "${newVersion}"`
  );

  fs.writeFileSync(BUILD_GRADLE, content);
}

/**
 * Update iOS project.pbxproj
 */
function updateIOSVersion(newVersion, buildNumber) {
  if (!fs.existsSync(PBXPROJ)) {
    console.log('  iOS project not found, skipping...');
    return;
  }

  let content = fs.readFileSync(PBXPROJ, 'utf8');

  // Update MARKETING_VERSION (display version)
  content = content.replace(
    /MARKETING_VERSION = [^;]+;/g,
    `MARKETING_VERSION = ${newVersion};`
  );

  // Update CURRENT_PROJECT_VERSION (build number)
  content = content.replace(
    /CURRENT_PROJECT_VERSION = [^;]+;/g,
    `CURRENT_PROJECT_VERSION = ${buildNumber};`
  );

  fs.writeFileSync(PBXPROJ, content);
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
Usage: node scripts/bump-version.mjs <type>

Types:
  patch    Bump patch version (1.0.0 -> 1.0.1)
  minor    Bump minor version (1.0.0 -> 1.1.0)
  major    Bump major version (1.0.0 -> 2.0.0)
  X.Y.Z    Set specific version

Examples:
  node scripts/bump-version.mjs patch
  node scripts/bump-version.mjs 2.0.0
    `);
    process.exit(1);
  }

  const type = args[0];

  // Read current version
  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf8'));
  const currentVersion = packageJson.version;

  // Calculate new version
  const newVersion = bumpVersion(currentVersion, type);
  const buildNumber = versionToBuildNumber(newVersion);

  console.log(`\nVersion bump: ${currentVersion} -> ${newVersion}`);
  console.log(`Build number: ${buildNumber}\n`);

  // Update all files
  console.log('Updating files:');

  console.log('  package.json');
  updatePackageJson(newVersion);

  console.log('  android/app/build.gradle');
  updateAndroidVersion(newVersion, buildNumber);

  console.log('  ios/App/App.xcodeproj/project.pbxproj');
  updateIOSVersion(newVersion, buildNumber);

  console.log(`\nDone! Version updated to ${newVersion}\n`);
  console.log('Next steps:');
  console.log('  1. Review changes: git diff');
  console.log('  2. Commit: git add . && git commit -m "Bump version to ' + newVersion + '"');
  console.log('  3. Tag: git tag v' + newVersion);
  console.log('  4. Push: git push && git push --tags\n');
}

main();
