const documentation = [
  {
    target: 'queue',
    docs: 'Defines the name of the queue to use. It MUST NOT exceed 255 characters.',
  },
  {
    target: 'bindingVersion',
    docs: 'The version of this binding. If omitted, "0.1.0" MUST be assumed.',
  },
  {
    docs: '#### [Operation Binding Object](https://github.com/asyncapi/bindings/blob/master/nats/README.md#operation-binding-object)\n\nField Name | Type | Description\n---|:---:|---\n| `queue` | string | Defines the name of the queue to use. It MUST NOT exceed 255 characters. |\n| `bindingVersion` | string | The version of this binding. If omitted, "0.1.0" MUST be assumed. |',
  },
];
export default documentation;
