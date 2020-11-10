import stampit from 'stampit';
import axios from 'axios';
import { clone } from 'ramda';

import HttpResolver from './HttpResolver';
import ResolverError from '../util/errors/ResolverError';

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

    this.read = async function read(uri: string): Promise<Buffer> {
      try {
        const response = await axiosInstance.get(uri);
        return response.data;
      } catch (e) {
        throw new ResolverError(`Error downloading "${uri}"`, e);
      }
    };
  },
);

export default HttpResolverAxios;
