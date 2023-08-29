import { NotImplementedError } from '@swagger-api/apidom-error';

class MediaTypes<T> extends Array<T> {
  unknownMediaType = 'application/octet-stream';

  // eslint-disable-next-line class-methods-use-this
  filterByFormat() {
    throw new NotImplementedError('"filterByFormat" method is not implemented.');
  }

  // eslint-disable-next-line class-methods-use-this
  findBy() {
    throw new NotImplementedError('"findBy" method is not implemented.');
  }

  // eslint-disable-next-line class-methods-use-this
  latest() {
    throw new NotImplementedError('"latest" method is not implemented.');
  }
}

export default MediaTypes;
