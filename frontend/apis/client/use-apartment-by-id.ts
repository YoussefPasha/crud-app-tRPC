import { IApartmentAPIResponse, IApartmentById } from "@/@types/apartment";
import { endPoints } from "@/constants/endpoints";
import QueryKeys from "@/config/query-keys";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { kyFetch } from "@/utils/kyFetch";

const getApartmentById = async ({
  id,
}: {
  id: string | number | string[] | undefined;
}) => {
  const response = await kyFetch.get(`${endPoints.getApartments}/${id}`);

  const json = (await response.json()) as IApartmentAPIResponse;

  console.log(json);

  return json?.data;
};

export const useApartmentById = ({
  id,
  initialValues,
}: {
  id: string | number | string[] | undefined;
  initialValues?: IApartmentById;
}) => {
  const query = useQuery<IApartmentById | null>({
    queryKey: [QueryKeys.APARTMENT, id],
    queryFn: () => getApartmentById({ id }),
    initialData: initialValues,
    placeholderData: keepPreviousData,
    enabled: true,
  });

  return query;
};
