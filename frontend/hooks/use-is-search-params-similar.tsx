import { useSearchParams } from "next/navigation";
import React from "react";

const useIsInitialSearchParamSimilar = (initialSearchParams: any) => {
  const searchParams = useSearchParams();

  const isSimilar = React.useMemo(() => {
    const oldPathParams = new URLSearchParams(initialSearchParams);
    const currentPathParams = new URLSearchParams(searchParams);

    oldPathParams.forEach((value, key) => {
      if (currentPathParams.get(key) !== value) {
        return false;
      } else {
        currentPathParams.delete(key);
      }
    });

    if (currentPathParams.toString()) {
      return false;
    }

    return true;
  }, [initialSearchParams, searchParams]);

  return isSimilar;
};

export default useIsInitialSearchParamSimilar;
