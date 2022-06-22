import { httpClient } from "../httpClient/httpClient";

const HttpInterceptor = () => {
  httpClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // config.headers['Content-Type'] = 'application/json';
      return config;
    },
    (error) => {
      throw new Error(error);
    }
  );
};

export default HttpInterceptor;

// import { httpClient } from "../httpClient/httpClient";

// const ErrorInterceptor = () => {
//   httpClient.interceptors.response.use(
//     (res) => res,
//     (err) => {
//       throw new Error(err.response.data.message);
//     }
//   );
// };

// export default ErrorInterceptor;
