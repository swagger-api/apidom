import { ObjectElement, ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

import OpenapiElement from './Openapi';
import InfoElement from './Info';
import ComponentsElement from './Components';
import ExternalDocumentationElement from './ExternalDocumentation';

// eslint-disable-next-line @typescript-eslint/naming-convention
class OpenApi3_0 extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'openApi3_0';
    this.classes.push('api');
  }

  get openapi(): OpenapiElement | undefined {
    return this.get('openapi');
  }

  set openapi(openapi: OpenapiElement | undefined) {
    this.set('openapi', openapi);
  }

  get info(): InfoElement | undefined {
    return this.get('info');
  }

  set info(info: InfoElement | undefined) {
    this.set('info', info);
  }

  get servers(): ArrayElement | undefined {
    return this.get('servers');
  }

  set servers(servers: ArrayElement | undefined) {
    this.set('servers', servers);
  }

  get paths(): ArrayElement | undefined {
    return this.get('paths');
  }

  set paths(paths: ArrayElement | undefined) {
    this.set('paths', paths);
  }

  get components(): ComponentsElement | undefined {
    return this.get('components');
  }

  set components(components: ComponentsElement | undefined) {
    this.set('components', components);
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

export default OpenApi3_0;
