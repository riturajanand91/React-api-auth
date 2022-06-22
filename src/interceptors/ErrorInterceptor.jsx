import { httpClient } from "../httpClient/httpClient";

const ErrorInterceptor = () => {
  httpClient.interceptors.response.use(
    (res) => res,
    (err) => {
      console.log(err);

      throw new Error(err.message);
    }
  );
};

export default ErrorInterceptor;
