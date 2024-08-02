import ky, { BeforeRequestHook } from "ky";
import { kyConfigs } from "./config";
import merge from "lodash/merge";

const cookieInterceptor: BeforeRequestHook = async (request) => {
  request.headers.set(
    "Authorization",
    `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN || ""}`
  );
};

export const kyFetch = ky.create(
  merge(JSON.parse(JSON.stringify(kyConfigs)), {
    hooks: {
      afterResponse: [
        async (_input: Request, _options: any, response: Response) => {
          const body = await response.json();
          if (body.errors || body.message) {
            throw new Error(JSON.stringify(body));
          }
        },
      ],
      beforeRequest: [cookieInterceptor],
    },
  })
);
