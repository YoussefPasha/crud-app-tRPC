import type { Options, BeforeErrorHook } from "ky";

const errorInterceptor: BeforeErrorHook = async (error) => {
  return error;
};

export const kyConfigs: Options = {
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "same-origin",
  headers: {
    Accept: "application/json",
  },
  hooks: {
    beforeError: [errorInterceptor],
  },
};
