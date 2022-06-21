class MediaTypes<T> extends Array<T> {
  unknownMediaType = 'application/octet-stream';

  // eslint-disable-next-line class-methods-use-this
  filterByFormat() {
    throw new Error('Not implemented!');
  }

  // eslint-disable-next-line class-methods-use-this
  findBy() {
    throw new Error('Not implemented');
  }

  // eslint-disable-next-line class-methods-use-this
  latest() {
    throw new Error('Not implemented!');
  }
}

export default MediaTypes;
