## Troubleshooting

Read this when Phase 8 (build, type check, IDE test) fails or behaves unexpectedly.

### Issue: Cannot find element definitions

**Solution**: Ensure the namespace package is built. Element definitions are in `packages/{namespace}/src/elements/`. If elements are not clearly defined, check the refractor specification.

### Issue: Documentation URLs are incorrect

**Solution**: Verify the specification documentation base URL. Different versions may have different URL structures. Check existing version configs for the pattern.

### Issue: Lint rules are too strict

**Solution**: Review the specification to determine which fields are truly required vs optional. Use `DiagnosticSeverity.Warning` for optional best practices.

### Issue: Completion not showing up

**Solution**:
1. Check that `targetSpecs` is correctly set
2. Verify the completion format matches the property type
3. Ensure meta.ts properly exports the completion array

### Issue: Build errors in apidom-ls

**Solution**:
1. Check all imports use `.ts` extension
2. Verify all referenced target spec symbols exist in target-specs.ts
3. Run `npm run lint:fix` to fix formatting issues
