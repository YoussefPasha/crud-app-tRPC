"use client";
import { IApartmentById } from "@/@types/apartment";
import { useApartmentById } from "@/apis";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import Loader from "../ui/loader";

const ApartmentDetailsScreen = ({
  initialApartmentDetailsResponse,
}: {
  initialApartmentDetailsResponse: IApartmentById | undefined;
}) => {
  const params = useParams();

  const { data: apartmentDetailsResponse, isLoading } = useApartmentById({
    id: params.id,
    initialValues: initialApartmentDetailsResponse,
  });

  return (
    <>
      {isLoading && <Loader />}
      {apartmentDetailsResponse ? (
        <section className=" mx-auto overflow-hidden ">
          <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full px-4 md:w-1/2">
                <div className={`relative w-full h-full overflow-hidden`}>
                  <Image
                    width={400}
                    height={400}
                    src={apartmentDetailsResponse.imageUrl}
                    alt={apartmentDetailsResponse.name}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>
              <div className="w-full py-8 px-4 md:w-1/2 ">
                <div className="lg:pl-20">
                  <div className="pb-6 mb-8 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="max-w-xl mt-2 mb-6 leading-normal text-xl font-bold dark:text-gray-300 md:text-4xl">
                      {apartmentDetailsResponse.name}
                    </h2>
                    <h4 className="max-w-xl mt-2 mb-6 leading-normal text-xl/3 dark:text-gray-300 md:text-xl">
                      <strong>Address: </strong>
                      {apartmentDetailsResponse.address}
                    </h4>
                    <p className="max-w-md mb-8 leading-normal text-gray-700 dark:text-gray-400">
                      <strong>City: </strong>
                      {apartmentDetailsResponse.city}
                    </p>
                    <p className="inline-block leading-normal mb-8 text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                      <span>{apartmentDetailsResponse.price} EGP</span>
                    </p>
                    <p className="max-w-md mb-8 leading-normal text-gray-700 dark:text-gray-400">
                      <strong>State: </strong>
                      <span>{apartmentDetailsResponse.state}</span>
                    </p>
                    <p className="max-w-md mb-8 leading-normal text-gray-700 dark:text-gray-400">
                      <strong>Units: </strong>
                      <span>{apartmentDetailsResponse.units}</span>
                    </p>
                    <p className="max-w-md mb-8 leading-normal text-gray-700 dark:text-gray-400">
                      <strong>Zip code: </strong>
                      <span>{apartmentDetailsResponse.zipCode}</span>
                    </p>
                    <p className="max-w-md leading-normal text-gray-700 dark:text-gray-400">
                      <strong>({apartmentDetailsResponse.ratings})</strong>{" "}
                      ratings from{" "}
                      <strong>{apartmentDetailsResponse.ratings}</strong> people
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex w-full h-full flex-col items-center justify-center gap-4">
          <h2 className="text-destructive text-4xl">Something went wrong!</h2>
          <Button asChild>
            <Link href={"/"}>Go back to home</Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default ApartmentDetailsScreen;
