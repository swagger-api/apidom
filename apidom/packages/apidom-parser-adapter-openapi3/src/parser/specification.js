'use strict';

const DocumentVisitor = require('./visitors/DocumentVisitor');
const CommentVisitor = require('./visitors/CommentVisitor');
const OpenApiVisitor = require('./visitors/OpenApiVisitor');
const OpenApiExtensionVisitor = require('./visitors/OpenApiExtensionVisitor');
const OpenapiVisitor = require('./visitors/OpenapiVisitor');
const InfoVisitor = require('./visitors/info');
const InfoTitleVisitor = require('./visitors/info/TitleVisitor');
const InfoDescriptionVisitor = require('./visitors/info/DescriptionVisitor');
const InfoTermsOfServiceVisitor = require('./visitors/info/TermsOfServiceVisitor');
const InfoVersionVisitor = require('./visitors/info/VersionVisitor');
const ContactVisitor = require('./visitors/info/contact');
const ContactNameVisitor = require('./visitors/info/contact/NameVisitor');
const ContactUrlVisitor = require('./visitors/info/contact/UrlVisitor');
const ContactEmailVisitor = require('./visitors/info/contact/EmailVisitor');
const LicenseVisitor = require('./visitors/info/license');
const LicenseNameVisitor = require('./visitors/info/license/NameVisitor');
const LicenseUrlVisitor = require('./visitors/info/license/UrlVisitor');
const ComponentsVisitor = require('./visitors/components');
const SchemasVisitor = require('./visitors/components/SchemasVisitor');
const SchemaVisitor = require('./visitors/SchemaVisitor');
const { ValueVisitor, ObjectVisitor, ArrayVisitor } = require('./visitors/generics');

/**
 * Specification object allows us to have complete control over visitors
 * when traversing the AST.
 * Specification also allows us to create new parser adapters from
 * existing ones by manipulating it.
 */
const specification = {
  visitors: {
    value: ValueVisitor,
    object: ObjectVisitor,
    array: ArrayVisitor,
    document: {
      $visitor: DocumentVisitor,
      comment: CommentVisitor,
      openApi: {
        openApiExtension: OpenApiExtensionVisitor,
        schema: SchemaVisitor,
        $visitor: OpenApiVisitor,
        openapi: OpenapiVisitor,
        info: {
          $visitor: InfoVisitor,
          title: InfoTitleVisitor,
          description: InfoDescriptionVisitor,
          termsOfService: InfoTermsOfServiceVisitor,
          version: InfoVersionVisitor,
          contact: {
            $visitor: ContactVisitor,
            name: ContactNameVisitor,
            url: ContactUrlVisitor,
            email: ContactEmailVisitor,
          },
          license: {
            $visitor: LicenseVisitor,
            name: LicenseNameVisitor,
            url: LicenseUrlVisitor,
          }
        },
        components: {
          $visitor: ComponentsVisitor,
          schemas: SchemasVisitor,
        },
      },
    },
  },
};

module.exports = {
  specification,
};
