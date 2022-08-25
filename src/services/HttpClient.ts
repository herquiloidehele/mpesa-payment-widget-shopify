import axios from "axios";
import type { AxiosInstance, AxiosRequestHeaders } from "axios";

export default class HttpClient {
  private static classInstance: HttpClient;
  private static axiosInstance: AxiosInstance;

  public static getInstance(): HttpClient {
    if (!HttpClient.axiosInstance) {
      HttpClient.classInstance = new HttpClient();

      HttpClient.axiosInstance = axios.create({
        timeout: 60000,
        baseURL: import.meta.env.VITE_API_URL,
      });

      HttpClient.addRequestInterceptors();
    }

    return HttpClient.classInstance;
  }

  public static get<ResponseType>(path: string, headers?: AxiosRequestHeaders) {
    return HttpClient.axiosInstance.get<ResponseType>(path, { headers });
  }

  public static post<ResponseType>(path: string, data?: any, headers?: AxiosRequestHeaders) {
    return HttpClient.axiosInstance.post<ResponseType>(path, data, { headers });
  }

  public static put<ResponseType>(path: string, data?: any, headers?: AxiosRequestHeaders) {
    return HttpClient.axiosInstance.put<ResponseType>(path, data, { headers });
  }

  private static addRequestInterceptors() {
    HttpClient.axiosInstance.interceptors.request.use((request: any) => {
      return request;
    });
  }

  public static addResponseInterceptor(handleGenericErrors: (error: any) => Promise<any>) {
    HttpClient.axiosInstance.interceptors.response.use(
      (response: any) => {
        return response;
      },
      (error: any) => Promise.reject(handleGenericErrors(error))
    );
  }
}
