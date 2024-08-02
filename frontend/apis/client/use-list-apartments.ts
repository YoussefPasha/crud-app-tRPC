import { IApartmentsAPIResponse } from "@/@types/apartment";
import { endPoints } from "@/constants/endpoints";
import QueryKeys from "@/config/query-keys";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { kyFetch } from "@/utils/kyFetch";

const getApartmentsList = async (params: any) => {
  const response = await kyFetch.get(endPoints.getApartments, {
    searchParams: params,
  });

  const json = (await response.json()) as IApartmentsAPIResponse;
  return json;
};

export const useApartmentsList = ({
  params,
  initialValues,
}: {
  params: any;
  initialValues?: IApartmentsAPIResponse;
}) => {
  const query = useQuery<IApartmentsAPIResponse | null>({
    queryKey: [QueryKeys.APARTMENTS, ...params],
    queryFn: () => getApartmentsList(params),
    initialData: initialValues,
    placeholderData: keepPreviousData,
    enabled: true,
  });

  return query;
};
