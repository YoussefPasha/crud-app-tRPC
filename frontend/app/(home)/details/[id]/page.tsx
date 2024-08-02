import { getApartmentById } from "@/apis";
import ApartmentDetailsScreen from "@/components/screens/apartment-details";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

type DetailsPageProps = {
  params: {
    id: string;
  };
};

const Details = async ({ params: { id } }: DetailsPageProps) => {
  const apartmentDetailsResponse = await getApartmentById(id);

  return (
    <Suspense fallback={<WaitFallback />}>
      <ApartmentDetailsScreen
        initialApartmentDetailsResponse={apartmentDetailsResponse}
      />
    </Suspense>
  );
};
export default Details;

function WaitFallback() {
  return (
    <div className=" mx-auto mt-10">
      <h1 className="text-4xl font-bold">
        <Skeleton className="w-[250px]  md:w-[800px] h-[100px] mb-10" />
        <Skeleton className="w-[250px]  md:w-[800px] h-[100px] mb-10" />
        <Skeleton className="w-[250px]  md:w-[800px] h-[100px] mb-10" />
        <Skeleton className="w-[250px]  md:w-[800px] h-[100px]" />
      </h1>
    </div>
  );
}
