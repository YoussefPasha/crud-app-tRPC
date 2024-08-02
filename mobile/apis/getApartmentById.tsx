import { IApartmentAPIResponse } from "@/@types/apartment";
import { axiosInstance as axios, endPoints } from "@/config/axios";
import QueryKeys from "@/config/query-keys";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getApartmentById = async (id: string | string[] | undefined) => {
  const { data } = await axios.get(`${endPoints.getApartments}/${id}`);

  return data;
};

export const useApartmentById = (id: string | string[] | undefined) => {
  const query = useQuery<IApartmentAPIResponse, AxiosError>({
    queryKey: [QueryKeys.APARTMENT, id],
    queryFn: () => getApartmentById(id),
  });

  return query;
};
