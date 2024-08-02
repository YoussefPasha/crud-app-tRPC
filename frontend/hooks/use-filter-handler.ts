import React, { startTransition, useCallback } from "react";
import useCreateQueryString from "./use-create-query-string";
import { useRouter } from "next/navigation";
import debounce from "lodash/debounce";

const useFilterHandler = () => {
  const [loader, setLoader] = React.useState(false);
  const router = useRouter();
  const { createObjectQueryString } = useCreateQueryString();

  const filterHandler = useCallback(
    (params: any, shallow = true) => {
      setLoader(false);
      !shallow && router.push(createObjectQueryString(params));

      shallow &&
        startTransition(() => {
          window.history.pushState({}, "", createObjectQueryString(params));
        });
    },
    [createObjectQueryString, router]
  );

  const debouncedFilterHandler = useCallback(
    debounce((params: any, shallow = true) => {
      filterHandler(params, shallow);
    }, 500),
    [filterHandler]
  );

  return { loader, setLoader, debouncedFilterHandler };
};

export default useFilterHandler;
