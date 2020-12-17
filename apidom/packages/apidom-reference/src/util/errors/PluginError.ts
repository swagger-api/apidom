class PluginError extends Error {
  public cause: Error;

  public plugin: any;

  constructor(message: string, cause: Error, plugin: any) {
    super(message);
    this.cause = cause;
    this.plugin = plugin;
  }
}

export default PluginError;
