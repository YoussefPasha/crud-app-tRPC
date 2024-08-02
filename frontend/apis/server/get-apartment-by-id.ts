import { IApartmentAPIResponse } from "@/@types/apartment";
import { endPoints } from "@/constants/endpoints";
import { kyFetch } from "@/utils/kyFetch";

export const getApartmentById = async (id: string | string[] | undefined) => {
  try {
    const response = await kyFetch.get(`${endPoints.getApartments}/${id}`);

    const json = (await response.json()) as IApartmentAPIResponse;

    return json?.data;
  } catch (error) {
    console.error(error);
  }
};
