import { omit } from 'ramda';
import { ensureArray } from 'ramda-adjunct';
import axios, { Axios, AxiosInstance, CreateAxiosDefaults } from 'axios';

import HTTPResolver, { HTTPResolverOptions } from '../HTTPResolver';
import File from '../../../File';
import ResolverError from '../../../errors/ResolverError';

interface HTTPResolverAxiosConfig extends CreateAxiosDefaults {
  interceptors?: Axios['interceptors'];
}

export interface HTTPResolverAxiosOptions extends Omit<HTTPResolverOptions, 'name'> {
  readonly axiosConfig?: HTTPResolverAxiosConfig;
}

class HTTPResolverAxios extends HTTPResolver {
  public axiosConfig: HTTPResolverAxiosConfig = {};

  protected axiosInstance!: AxiosInstance;

  protected previousAxiosConfig!: HTTPResolverAxiosConfig;

  constructor(options?: HTTPResolverAxiosOptions) {
    const { axiosConfig = {}, ...rest } = options ?? {};

    super({ ...rest, name: 'http-axios' });
    this.axiosConfig = axiosConfig;
  }

  getHttpClient(): AxiosInstance {
    if (this.axiosInstance === undefined || this.previousAxiosConfig !== this.axiosConfig) {
      const config = omit(['interceptors'], this.axiosConfig);
      const { interceptors } = this.axiosConfig;

      this.axiosInstance = axios.create({
        timeout: this.timeout,
        maxRedirects: this.redirects,
        withCredentials: this.withCredentials,
        responseType: 'arraybuffer',
        ...config,
      });

      // settings up request interceptors
      if (Array.isArray(interceptors?.request)) {
        interceptors.request.forEach((requestInterceptor) => {
          this.axiosInstance.interceptors.request.use(...ensureArray(requestInterceptor));
        });
      }

      // settings up response interceptors
      if (Array.isArray(interceptors?.response)) {
        interceptors.response.forEach((responseInterceptor: any) => {
          this.axiosInstance.interceptors.response.use(...ensureArray(responseInterceptor));
        });
      }

      this.previousAxiosConfig = this.axiosConfig;
    }

    return this.axiosInstance;
  }

  async read(file: File): Promise<Buffer> {
    const client: AxiosInstance = this.getHttpClient();

    try {
      const response = await client.get<Buffer>(file.uri);
      return response.data;
    } catch (error: unknown) {
      throw new ResolverError(`Error downloading "${file.uri}"`, { cause: error });
    }
  }
}

export default HTTPResolverAxios;
