# Troubleshooting

Read this when `npm run build`, `npm run test`, `npm run typescript:check-types` or `npm run lint`
fails for the new namespace package.

## Build Errors
- Ensure all imports use `.ts` extension
- Check that all element classes are properly exported
- Verify TypeScript configuration is correct

## Test Failures
- Run `npm run test:update-snapshots` to update snapshots after changes
- Ensure test data matches specification structure
- Check that all predicates are properly exported

## Type Errors
- Verify all visitor interfaces extend correct base interfaces
- Check that element content types match base class expectations
- Ensure all visitor options are properly typed
