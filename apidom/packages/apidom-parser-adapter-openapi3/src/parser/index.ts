import * as apiDOM from 'apidom';
import openapi3 from 'apidom-ns-openapi3';
import * as jsonAst from 'json-ast';
import specification from './specification';
import { visit } from './visitor';

const parse = (
  source: string,
  { sourceMap = false, verbose = true, junker = true, specObj = specification } = {},
) => {
  const namespace = apiDOM.createNamespace(openapi3);
  const parseResultElement = new namespace.elements.ParseResult();
  const documentVisitor = specObj.visitors.document.$visitor();
  let ast = null;

  try {
    ast = jsonAst.parse(source, { verbose, junker });
    visit(ast, documentVisitor, {
      state: { namespace, specObj, sourceMap, element: parseResultElement },
    });
    return documentVisitor.element;
  } catch (error) {
    const annotation = new namespace.elements.Annotation(error.message);
    annotation.classes.push('error');
    parseResultElement.push(annotation);
    return parseResultElement;
  }
};

export default parse;
