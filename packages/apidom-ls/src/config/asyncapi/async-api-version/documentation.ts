const documentation = [
  {
    docs: '#### [AsyncAPI Version String](https://www.asyncapi.com/docs/reference/specification/v2.5.0#A2SVersionString)\n\nThe version string signifies the version of the AsyncAPI Specification that the document complies to.\nThe format for this string _must_ be `major`.`minor`.`patch`.  The `patch` _may_ be suffixed by a hyphen and extra alphanumeric characters.\n\\\n\\\nA `major`.`minor` shall be used to designate the AsyncAPI Specification version, and will be considered compatible with the AsyncAPI Specification specified by that `major`.`minor` version.\nThe patch version will not be considered by tooling, making no distinction between `1.0.0` and `1.0.1`.\n\\\n\\\nIn subsequent versions of the AsyncAPI Specification, care will be given such that increments of the `minor` version should not interfere with operations of tooling developed to a lower minor version. Thus a hypothetical `1.1.0` specification should be usable with tooling designed for `1.0.0`.',
  },
];

export default documentation;
