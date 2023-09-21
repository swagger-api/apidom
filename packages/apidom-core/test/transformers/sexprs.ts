import { assert } from 'chai';
import dedent from 'dedent';
import { trim } from 'ramda';
import { InfoElement } from '@swagger-api/apidom-ns-openapi-3-1';

import { sexprs, ObjectElement } from '../../src';

describe('sexprs', function () {
  context('given generic ApiDOM', function () {
    specify('should transform into S-expressions', function () {
      const genericObj = new ObjectElement({
        a: 1,
        b: true,
        c: ['a', null],
      });
      const expected = trim(dedent`
        (ObjectElement
          (MemberElement
            (StringElement)
            (NumberElement))
          (MemberElement
            (StringElement)
            (BooleanElement))
          (MemberElement
            (StringElement)
            (ArrayElement
              (StringElement)
              (NullElement))))`);

      assert.strictEqual(sexprs(genericObj), expected);
    });
  });

  context('given semantic ApiDOM', function () {
    specify('should transform into S-expressions', function () {
      // @ts-ignore
      const semanticObj = InfoElement.refract({
        title: 'title',
        summary: 'summary',
        description: 'description',
        contact: {
          name: 'name',
          url: 'url',
          email: 'email',
        },
        license: {
          name: 'name',
          identifier: 'identifier',
          url: 'url',
        },
        version: '1.0.0',
      });
      const expected = trim(dedent`
        (InfoElement
          (MemberElement
            (StringElement)
            (StringElement))
          (MemberElement
            (StringElement)
            (StringElement))
          (MemberElement
            (StringElement)
            (StringElement))
          (MemberElement
            (StringElement)
            (ContactElement
              (MemberElement
                (StringElement)
                (StringElement))
              (MemberElement
                (StringElement)
                (StringElement))
              (MemberElement
                (StringElement)
                (StringElement))))
          (MemberElement
            (StringElement)
            (LicenseElement
              (MemberElement
                (StringElement)
                (StringElement))
              (MemberElement
                (StringElement)
                (StringElement))
              (MemberElement
                (StringElement)
                (StringElement))))
          (MemberElement
            (StringElement)
            (StringElement)))`);

      assert.strictEqual(sexprs(semanticObj), expected);
    });
  });
});
