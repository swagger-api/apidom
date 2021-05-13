import stampit from 'stampit';
import axios from 'axios';
import { clone } from 'ramda';

import ResolverError from '../../util/errors/ResolverError';
import { HttpResolver as IHttpResolver, File as IFile } from '../../types';
import HttpResolver from './HttpResolver';

const HttpResolverAxios: stampit.Stamp<IHttpResolver> = stampit(HttpResolver).init(
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

    this.name = 'http-axios';

    this.getHttpClient = function getHttpClient() {
      return clone(axiosInstance);
    };

    this.read = async function read(file: IFile): Promise<Buffer> {
      try {
        const response = await axiosInstance.get(file.uri);
        return Buffer.from(response.data);
      } catch (e) {
        throw new ResolverError(`Error downloading "${file.uri}"`, e);
      }
    };
  },
);

export default HttpResolverAxios;
