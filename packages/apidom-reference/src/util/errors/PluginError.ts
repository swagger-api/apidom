import { ApiDOMError } from '@swagger-api/apidom-error';

class PluginError extends ApiDOMError {
  public plugin: any;

  constructor(message: string, options: { cause?: Error; plugin: any }) {
    super(message, { cause: options.cause });
    this.plugin = options.plugin;
  }
}

export default PluginError;
