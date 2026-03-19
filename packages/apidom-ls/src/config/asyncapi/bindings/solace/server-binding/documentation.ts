const documentation = [
  {
    target: 'msgVpn',
    docs: '`string`\n\\\n\\\nThe Virtual Private Network name on the Solace broker.',
  },
  {
    target: 'clientName',
    docs: '`string`\n\\\n\\\nA unique client name to use to register to the appliance. If specified, it must be a valid Topic name, and a maximum of 160 bytes in length when encoded as UTF-8.',
  },
  {
    target: 'bindingVersion',
    docs: '`string`\n\\\n\\\nThe version of this binding. If omitted, "0.4.0" MUST be assumed.',
  },
  {
    docs: '#### [Server Binding Object](https://github.com/asyncapi/bindings/tree/master/solace#server-binding-object)\n\nField Name | Type | Description\n---|---|---\n`bindingVersion`|String|The version of this binding. If omitted, "0.4.0" MUST be assumed.\n`msgVpn`|String|The Virtual Private Network name on the Solace broker.\n`clientName`|String|A unique client name to use to register to the appliance. If specified, it must be a valid Topic name, and a maximum of 160 bytes in length when encoded as UTF-8.',
  },
];
export default documentation;
