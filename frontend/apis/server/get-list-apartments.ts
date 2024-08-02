import { IApartmentsAPIResponse } from "@/@types/apartment";
import { endPoints } from "@/constants/endpoints";
import { kyFetch } from "@/utils/kyFetch";

export const getApartmentsList = async (params: any) => {
  try {
    const response = await kyFetch.get(endPoints.getApartments, {
      searchParams: params,
    });

    const json = (await response.json()) as IApartmentsAPIResponse;

    return json;
  } catch (error) {
    console.error(error);
  }
};
