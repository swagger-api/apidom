import { ApiDOMError } from '@swagger-api/apidom-error';

class MediaTypes<T> extends Array<T> {
  unknownMediaType = 'application/octet-stream';

  // eslint-disable-next-line class-methods-use-this
  filterByFormat() {
    throw new ApiDOMError('Not implemented!');
  }

  // eslint-disable-next-line class-methods-use-this
  findBy() {
    throw new ApiDOMError('Not implemented');
  }

  // eslint-disable-next-line class-methods-use-this
  latest() {
    throw new ApiDOMError('Not implemented!');
  }
}

export default MediaTypes;
