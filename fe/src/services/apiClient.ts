import * as superagent from 'superagent';

interface IHttpErrorResponse extends Error {
  response: object;
}

interface IApiParams {
  headers?: object;
  query?: object;
  data?: object;
  type?: string;
}

interface IApiOptions {
  isDHeadersWanted?: boolean;
  skipAuth?: boolean;
}

type Method = <T = any>(path: string, params?: IApiParams, options?: IApiOptions) => Promise<T>;
type MethodType = 'get' | 'post' | 'put' | 'delete';

export default class ApiClient {
  methods: MethodType[] = ['get', 'post', 'put', 'delete'];
  defaults: { [key: string]: string | null } = {};
  apiHost: string;

  get!: Method;
  post!: Method;
  put!: Method;
  delete!: Method;

  constructor(apiHost: string) {
    this.apiHost = apiHost;
    this.methods.forEach(this._createMethod);
  }

  // delete: Method = () => new Promise(resolve => resolve());

  public setDefaultHeaders(key: string, value: string | null): void {
    this.defaults[key] = value;
  }

  private _createMethod = (method: MethodType) =>
    (this[method] = <T = {}>(
      path: string,
      { headers, query, data, type }: IApiParams = {},
      { isDHeadersWanted = true, skipAuth = false }: IApiOptions = {}
    ): Promise<T> => {
      const requestPromise = () =>
        new Promise<T>((resolve, reject) => {
          const url = this._formatUrl(path);

          const request = superagent[method](url) as superagent.Request;

          // Set default and custom headers
          if (headers || isDHeadersWanted) {
            const defaultHeaders = isDHeadersWanted ? this.defaults : {};
            let newHeaders = { ...defaultHeaders, ...headers };
            if (skipAuth) {
              const { Authorization, ...nonAuthHeaders } = newHeaders;
              newHeaders = nonAuthHeaders;
            }
            request.set(newHeaders);
          }
          if (type) {
            request.type(type);
          }
          if (query) {
            request.query(query);
          }
          if (data) {
            request.send(data);
          }

          request.end((err: IHttpErrorResponse, res: superagent.Response) => {
            if (err) {
              reject(err.response);
            } else {
              resolve(res.body || res);
            }
          });
        });

      return requestPromise();
    })

  private _adjustPath = (path: string): string => (path[0] !== '/' ? `/${path}` : path);

  private _formatUrl = (path: string): string => {
    const adjustedPath = this._adjustPath(path);
    return this.apiHost + adjustedPath;
  }
}