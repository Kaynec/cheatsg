// custom-instance.ts

import { $fetch } from "ofetch";
import type { FetchError } from "ofetch";

const toast = useToast();

const baseURL = "https://backend-cheatsgame.iran.liara.run"; // use your own URL here or environment variable

const loginApis = [
  "/api/user/register/",
  "/api/user/change-password/",
  "/api/user/request-verify-phone/",
  "/api/user/request-change-password/",
  ,
  "/api/user/verify-phone/",
  ,
  "/api/auth/jwt/verify/",
  ,
  "/api/auth/jwt/customer-login/",
];

function getToken() {
  const store = useAuthStore();
  return store.token;
}
function getRefreshToken() {
  const store = useAuthStore();
  return store.refreshToken;
}
function setToken(token: string) {
  const store = useAuthStore();
  store.setToken(token);
}
function setRefreshToken(token: string) {
  const store = useAuthStore();
  store.setRefreshToken(token);
}

export const customInstance = async <T>({
  url,
  method,
  params,
  data,
  headers,
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  params?: any;
  data?: unknown;
  responseType?: string;
  headers?: Record<string, string>;
}): Promise<T> => {
  const formattedHeaders = { ...headers };
  /**
   * Deletes the Content-Type header from the formattedHeaders object.
   * This ensures that the default Content-Type header will be used instead.
   */

  delete formattedHeaders["Content-Type"];

  const token = getToken();

  if (!loginApis.includes(url) && token && typeof token === "string") {
    formattedHeaders.Authorization = `Bearer ${token}`;
  }
  const reformedUrl =
    `${baseURL}${url}` + `${params ? "?" + new URLSearchParams(params) : ""}`;
  return $fetch(reformedUrl, {
    method,
    ...(data ? { body: data } : {}),
    headers: {
      ...formattedHeaders,
    },
  }).catch((error) => {
    const errorObject = error as any;
    // 401 Error
    const refresh = getRefreshToken();
    if (errorObject && errorObject.statusCode === 401 && refresh) {
      $fetch(`${baseURL}/api/auth/jwt/refresh`, {
        body: {
          refresh,
        },
      })
        .then((r) => {
          if (!r) return;
          if (r && r.data && r.data.access) {
            setToken(r.access || r.data.access);
          }
        })
        .catch(() => {
          // toast.error(
          //   errorObject?.data?.error ?? 'خطایی در رفرش کردن توکن رخ داده است'
          // )
          setToken("");
          setRefreshToken("");
        });
      return;
    }

    let err = "مشکلی رخ داده است";
    if (typeof errorObject.data?.detail === "string")
      err = errorObject?.data?.detail;
    if (errorObject?.data?.error) err = errorObject?.data?.error;

    toast.error(err);
    throw createError({
      message: errorObject.data.error,
      statusCode: errorObject.statusCode,
      statusMessage: errorObject.statusMessage,

      ...errorObject,
    });
  });
};

export default customInstance;

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = FetchError<Error>;
// In case you want to wrap the body type (optional)
// (if the custom instance is processing data before sending it, like changing the case for example)
