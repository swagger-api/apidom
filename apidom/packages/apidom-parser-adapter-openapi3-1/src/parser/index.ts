import * as jsonAst from 'json-ast';
import $RefParser from '@apidevtools/json-schema-ref-parser';
import * as apiDOM from 'apidom';
import openapi3_1 from 'apidom-ns-openapi3-1';
import specification from './specification';
import { visit } from './visitor';

const parse = async (
  source: string,
  { sourceMap = false, verbose = true, junker = true, specObj = specification } = {},
): Promise<apiDOM.ParseResultElement> => {
  const resolvedSpecObj = await $RefParser.dereference(specObj);
  const namespace = apiDOM.createNamespace(openapi3_1);
  const parseResultElement = new namespace.elements.ParseResult();
  const documentVisitor = resolvedSpecObj.visitors.document.$visitor();

  try {
    const ast = jsonAst.parse(source, { verbose, junker });
    visit(ast, documentVisitor, {
      state: {
        namespace,
        specObj: resolvedSpecObj,
        sourceMap,
        element: parseResultElement,
      },
    });
    return parseResultElement;
  } catch (error) {
    const annotation = new namespace.elements.Annotation(error.message);
    annotation.classes.push('error');
    parseResultElement.push(annotation);
    return parseResultElement;
  }
};

export default parse;
