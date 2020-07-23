import { logger } from '@services/logger';
import axios, { Method, AxiosError, AxiosResponse } from 'axios';

export interface RequestOptions {
  params?: {[key: string]: string};
  headers?: {[key: string]: string};
  body?: string | object;
  timeout?: number;
}

const defaultRequestOptions: Partial<RequestOptions> = {
  params: {},
  headers: {},
  body: '',
  timeout: 5000,
};

export class HttpService {
  public static isAxiosError<T>(err: unknown): err is AxiosError<T> {
    return (<any>err).isAxiosError;
  }

  public get<R>(url: string,
                options: RequestOptions = defaultRequestOptions): Promise<AxiosResponse<R>> {
    return this.makeRequest<R>(url, 'GET', options);
  }

  public post<R>(url: string,
                 options: RequestOptions = defaultRequestOptions): Promise<AxiosResponse<R>> {
    return this.makeRequest<R>(url, 'POST', options);
  }

  public put<R>(url: string,
                options: RequestOptions = defaultRequestOptions): Promise<AxiosResponse<R>> {
    return this.makeRequest<R>(url, 'PUT', options);
  }

  public patch<R>(url: string,
                  options: RequestOptions = defaultRequestOptions): Promise<AxiosResponse<R>> {
    return this.makeRequest<R>(url, 'PATCH', options);
  }

  public delete<R>(url: string,
                   options: RequestOptions = defaultRequestOptions): Promise<AxiosResponse<R>> {
    return this.makeRequest<R>(url, 'DELETE', options);
  }

  public async makeRequest<R>(url: string,
                              method: Method,
                              options: RequestOptions): Promise<AxiosResponse<R>> {
    logger.info(`HttpService request: method=${method}, url=${url}, options=`, options);
    const { timeout, headers, body, params } = options;
    const axiosService = axios.create();
    try {
      const source = axios.CancelToken.source();
      if (timeout)  {
        axiosService.defaults.timeout = timeout;
        setTimeout(
          () => source.cancel(`Timeout of ${timeout}ms.`),
          timeout,
        );
      }
      const resp: AxiosResponse<R> = await axiosService.request<R>({
        url,
        method,
        params,
        headers,
        data: body,
        cancelToken: source.token,
      });
      logger.info(`HttpService success: method=${method}, url=${url}, statusCode=${resp.status}`, resp.data);
      return resp;
    } catch (err) {
      if (HttpService.isAxiosError(err)) {
        const { response } = err;
        logger.info(
          `HttpService error: method=${method}, url=${url}, statusCode=${response?.status},
          statusText=${response?.statusText}`, response?.data
        );
      } else {
        logger.info(`HttpService unknown error: method=${method}, url=${url}, info=${err}`);
      }
      throw err;
    }
  }
}
