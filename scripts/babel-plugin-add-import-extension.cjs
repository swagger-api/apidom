/**
 * SPDX-FileCopyrightText: Copyright (c) 2019 Karl Prieb
 * SPDX-License-Identifier: MIT
 *
 * For more information, see the NOTICE file.
 */

const { declare } = require('@babel/helper-plugin-utils')
const { types: { importDeclaration, exportNamedDeclaration, exportAllDeclaration, stringLiteral } } = require('@babel/core')
const { existsSync, lstatSync } = require('node:fs')
const { resolve, extname, dirname } = require('node:path')

const isActiveExtension = (module, observedScriptExtensions) => {
  return observedScriptExtensions.indexOf(extname(module).replace(/[^a-z]/, '')) > -1;
}


const isNodeModule = module => {
  if (module.startsWith('.') || module.startsWith('/')) {
    return false
  }

  try {
    require.resolve(module)
    return true
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      return false
    }
    console.error(e)
  }
}

const skipModule = (module, { replace, extension, observedScriptExtensions }) => {
  const isExtensionObserved = isActiveExtension(module, observedScriptExtensions);
  const hasExtension = extname(module) !== '';
  const hasProperExtension = extname(module) === `.${extension}`;

  if ((!isExtensionObserved && hasExtension) || hasProperExtension) {
    return true;
  }

  const test = replace && (isExtensionObserved || hasProperExtension)
    ? hasProperExtension
    : hasExtension && (isExtensionObserved || hasProperExtension) && hasProperExtension

  return !module.startsWith('.') || isNodeModule(module) || test
};

const makeDeclaration =
  ({ declaration, args, replace = false, extension = 'js', observedScriptExtensions = ['js', 'ts', 'jsx', 'tsx', 'mjs', 'cjs'] }) =>
    (path, { file: { opts: { filename } } }) => {
      const { node } = path
      const { source, exportKind, importKind } = node

      const isTypeOnly = exportKind === 'type' || importKind === 'type'

      if (!source || isTypeOnly) { return }

      const module = source && source.value

      if (skipModule(module, { replace, extension, observedScriptExtensions })) { return }

      const dirPath = resolve(dirname(filename), module)

      const hasModuleExt = extname(module).length && isActiveExtension(module, observedScriptExtensions)
      const newModuleName = hasModuleExt ? module.slice(0, -extname(module).length) : module

      const pathLiteral = () => {
        if (existsSync(dirPath) && lstatSync(dirPath).isDirectory()) {
          return `${module}${newModuleName.endsWith('/') ? '' : '/'}index.${extension}`
        }

        return `${newModuleName}.${extension}`
      }

      path.replaceWith(
        declaration(
          ...args(path),
          stringLiteral(pathLiteral())
        )
      )
    }

module.exports = declare((api, options) => {
  api.assertVersion(7)

  return {
    name: 'add-import-extension',
    visitor: {
      ImportDeclaration: makeDeclaration({
        ...options,
        declaration: importDeclaration,
        args: ({ node: { specifiers } }) => [specifiers]
      }),
      ExportNamedDeclaration: makeDeclaration({
        ...options,
        declaration: exportNamedDeclaration,
        args: ({ node: { declaration, specifiers } }) => [declaration, specifiers]
      }),
      ExportAllDeclaration: makeDeclaration({
        ...options,
        declaration: exportAllDeclaration,
        args: () => []
      })
    }
  }
})
