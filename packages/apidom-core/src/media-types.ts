class MediaTypes<T> extends Array<T> {
  // eslint-disable-next-line class-methods-use-this
  forFormat() {
    throw new Error('Not implemented!');
  }

  // eslint-disable-next-line class-methods-use-this
  latest() {
    throw new Error('Not implemented!');
  }
}

export default MediaTypes;
