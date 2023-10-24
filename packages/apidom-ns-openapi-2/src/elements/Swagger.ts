import {
  ObjectElement,
  ArrayElement,
  StringElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

import SwaggerVersionElement from './SwaggerVersion';
import InfoElement from './Info';
import PathsElement from './Paths';
import DefinitionsElement from './Definitions';
import ParametersDefinitionsElement from './ParametersDefinitions';
import ResponsesDefinitionsElement from './ResponsesDefinitions';
import SecurityDefinitionsElement from './SecurityDefinitions';
import ExternalDocumentationElement from './ExternalDocumentation';

class Swagger extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'swagger';
    this.classes.push('api');
  }

  get swagger(): SwaggerVersionElement | undefined {
    return this.get('swagger');
  }

  set swagger(swagger: SwaggerVersionElement | undefined) {
    this.set('swagger', swagger);
  }

  get info(): InfoElement | undefined {
    return this.get('info');
  }

  set info(info: InfoElement | undefined) {
    this.set('info', info);
  }

  get host(): StringElement | undefined {
    return this.get('host');
  }

  set host(host: StringElement | undefined) {
    this.set('host', host);
  }

  get basePath(): StringElement | undefined {
    return this.get('basePath');
  }

  set basePath(basePath: StringElement | undefined) {
    this.set('basePath', basePath);
  }

  get schemes(): ArrayElement | undefined {
    return this.get('schemes');
  }

  set schemes(schemes: ArrayElement | undefined) {
    this.set('schemes', schemes);
  }

  get consumes(): ArrayElement | undefined {
    return this.get('consumes');
  }

  set consumes(consumes: ArrayElement | undefined) {
    this.set('consumes', consumes);
  }

  get produces(): ArrayElement | undefined {
    return this.get('produces');
  }

  set produces(produces: ArrayElement | undefined) {
    this.set('produces', produces);
  }

  get paths(): PathsElement | undefined {
    return this.get('paths');
  }

  set paths(paths: PathsElement | undefined) {
    this.set('paths', paths);
  }

  get definitions(): DefinitionsElement | undefined {
    return this.get('definitions');
  }

  set definitions(definitions: DefinitionsElement | undefined) {
    this.set('definitions', definitions);
  }

  get parameters(): ParametersDefinitionsElement | undefined {
    return this.get('parameters');
  }

  set parameters(parameters: ParametersDefinitionsElement | undefined) {
    this.set('parameters', parameters);
  }

  get responses(): ResponsesDefinitionsElement | undefined {
    return this.get('responses');
  }

  set responses(responses: ResponsesDefinitionsElement | undefined) {
    this.set('responses', responses);
  }

  get securityDefinitions(): SecurityDefinitionsElement | undefined {
    return this.get('securityDefinitions');
  }

  set securityDefinitions(securityDefinitions: SecurityDefinitionsElement | undefined) {
    this.set('securityDefinitions', securityDefinitions);
  }

  get security(): ArrayElement | undefined {
    return this.get('security');
  }

  set security(security: ArrayElement | undefined) {
    this.set('security', security);
  }

  get tags(): ArrayElement | undefined {
    return this.get('tags');
  }

  set tags(tags: ArrayElement | undefined) {
    this.set('tags', tags);
  }

  get externalDocs(): ExternalDocumentationElement | undefined {
    return this.get('externalDocs');
  }

  set externalDocs(externalDocs: ExternalDocumentationElement | undefined) {
    this.set('externalDocs', externalDocs);
  }
}

export default Swagger;
