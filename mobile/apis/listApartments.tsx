import { IApartmentsAPIResponse } from "@/@types/apartment";
import { axiosInstance as axios, endPoints } from "@/config/axios";
import QueryKeys from "@/config/query-keys";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getApartmentsList = async ({
  ratings,
  minPrice,
  maxPrice,
  page,
}: {
  ratings?: number;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
}) => {
  const { data } = await axios.get(endPoints.getApartments, {
    params: {
      rating: ratings,
      priceLow: minPrice,
      priceHigh: maxPrice,
      page,
    },
  });

  return data;
};

export const useApartmentsList = ({
  ratings,
  minPrice,
  maxPrice,
  page,
}: {
  ratings?: number;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
}) => {
  const query = useQuery<IApartmentsAPIResponse, AxiosError>({
    queryKey: [QueryKeys.APARTMENTS, null],
    queryFn: () => getApartmentsList({ ratings, minPrice, maxPrice, page }),
  });

  return query;
};
