import stampit from 'stampit';
import { omit, pathOr } from 'ramda';
import { ensureArray } from 'ramda-adjunct';
import axios, { AxiosInstance } from 'axios';

import ResolverError from '../../util/errors/ResolverError';
import { HttpResolver as IHttpResolver, File as IFile } from '../../types';
import HttpResolver from './HttpResolver';

const HttpResolverAxios: stampit.Stamp<IHttpResolver> = stampit(HttpResolver).init(
  function HttpResolverAxios() {
    /**
     * Private Api.
     */
    let axiosInstance: AxiosInstance;
    let oldAxiosConfig: Record<string, any>;

    /**
     * Public Api.
     */

    this.name = 'http-axios';

    this.getHttpClient = function getHttpClient(): AxiosInstance {
      if (typeof axiosInstance === 'undefined' || oldAxiosConfig !== this.axiosConfig) {
        const config = omit(['interceptors'], this.axiosConfig);
        const interceptors = pathOr(
          { request: [], response: [] },
          ['axiosConfig', 'interceptors'],
          this,
        );

        axiosInstance = axios.create({
          timeout: this.timeout,
          maxRedirects: this.redirects,
          withCredentials: this.withCredentials,
          responseType: 'arraybuffer',
          ...config,
        });

        // settings up request interceptors
        if (Array.isArray(interceptors?.request)) {
          interceptors.request.forEach((requestInterceptor: any) => {
            axiosInstance.interceptors.request.use(...ensureArray(requestInterceptor));
          });
        }

        // settings up response interceptors
        if (Array.isArray(interceptors?.response)) {
          interceptors.response.forEach((responseInterceptor: any) => {
            axiosInstance.interceptors.response.use(...ensureArray(responseInterceptor));
          });
        }

        oldAxiosConfig = this.axiosConfig;
      }

      return axiosInstance;
    };

    this.read = async function read(file: IFile): Promise<Buffer> {
      const client: AxiosInstance = this.getHttpClient();

      try {
        const response = await client.get<Buffer>(file.uri);
        return Buffer.from(response.data);
      } catch (error: any) {
        throw new ResolverError(`Error downloading "${file.uri}"`, error);
      }
    };
  },
);

export default HttpResolverAxios;
