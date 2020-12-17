import stampit from 'stampit';
import axios from 'axios';
import { clone } from 'ramda';

import HttpResolver from './HttpResolver';
import ResolverError from '../util/errors/ResolverError';
import File from '../util/File';

const HttpResolverAxios: stampit.Stamp<HttpResolver> = stampit(HttpResolver).init(
  function HttpResolverAxios() {
    /**
     * Private Api.
     */
    const axiosInstance = axios.create({
      timeout: this.timeout,
      maxRedirects: this.redirects,
      withCredentials: this.withCredentials,
      responseType: 'arraybuffer',
    });

    /**
     * Public Api.
     */

    this.getHttpClient = function getHttpClient() {
      return clone(axiosInstance);
    };

    this.read = async function read(file: File): Promise<Buffer> {
      try {
        const response = await axiosInstance.get(file.uri);
        return response.data;
      } catch (e) {
        throw new ResolverError(`Error downloading "${file.uri}"`, e);
      }
    };
  },
);

export default HttpResolverAxios;
