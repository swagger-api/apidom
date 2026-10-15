# Troubleshooting

## Build Errors

**Import resolution failures**:
- Ensure all imports use `.ts` extension
- Check that namespace package is built first
- Verify package.json exports are correct

**TypeScript errors**:
- Run `npm run typescript:check-types` to identify issues
- Check that `tsconfig.json` extends `../../tsconfig.json` like the sibling adapter's
- Ensure all types are properly exported from namespace

## Test Failures

**Snapshot mismatches**:
- Adapter packages have no `test:update-snapshots` script. Regenerate snapshots with `UPDATE_SNAPSHOT=1 npm run test` in the adapter directory (`mocha-chai-jest-snapshot` reads `UPDATE_SNAPSHOT`), then review the `test/__snapshots__/*.snap` diff
- Verify test fixtures are valid specification documents

**Detection failures**:
- Check regex patterns match specification version format
- Ensure test fixtures include version field
- Verify detection logic handles edge cases

**Parse errors**:
- Ensure namespace package exports root element class
- Verify refract method exists on root element
- Check that namespace is properly registered

## Integration Issues

**Media type detection fails**:
- Check media types are correctly imported from namespace
- Verify filterByFormat includes both 'generic' and format-specific types
- Test with both media type and content detection
