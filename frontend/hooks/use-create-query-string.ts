import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const useCreateQueryString = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const createObjectQueryString = useCallback(
    (data: Record<string, string>) => {
      const params = new URLSearchParams(searchParams);

      Object.keys(data)
        .filter((key) => {
          params.delete(key);
          return data[key];
        })
        .forEach((key) => {
          const paramData = data[key];
          if (Array.isArray(paramData) && paramData.length === 0) {
            return;
          }

          params.set(key, paramData);
        });
      return `${pathname}?${params.toString()}`;
    },
    [searchParams, pathname]
  );

  return {
    createObjectQueryString,
  };
};

export default useCreateQueryString;
