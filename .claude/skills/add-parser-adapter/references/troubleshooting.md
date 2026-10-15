# Troubleshooting

## Build Errors

**Import resolution failures**:
- Ensure all imports use `.ts` extension
- Check that namespace package is built first
- Verify package.json exports are correct

**TypeScript errors**:
- Run `npm run typescript:check-types` to identify issues
- Check that tsconfig references are correct
- Ensure all types are properly exported from namespace

## Test Failures

**Snapshot mismatches**:
- Run `npm run test:update-snapshots` to update
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

**Parser not found in apidom-reference**:
- Verify parser is imported in `saturated.ts`
- Check parser is added to `options.parse.parsers` array
- Ensure parser class name matches import

**Media type detection fails**:
- Check media types are correctly imported from namespace
- Verify filterByFormat includes both 'generic' and format-specific types
- Test with both media type and content detection
