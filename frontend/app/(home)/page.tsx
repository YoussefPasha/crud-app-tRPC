import { getApartmentsList } from "@/apis";
import ApartmentsListScreen from "@/components/screens/apartments-list";
import { Alert, AlertTitle } from "@/components/ui/alert";

const Home = async ({ searchParams }: { searchParams: any }) => {
  const apartmentsListResponse = await getApartmentsList(searchParams);

  if (apartmentsListResponse?.data?.length === 0) {
    <div className="flex flex-col gap-5">
      <Alert>
        <AlertTitle>There are no apartments yet!</AlertTitle>
      </Alert>
    </div>;
  }

  return (
    <ApartmentsListScreen
      initialApartmentsListResponse={apartmentsListResponse}
      initialSearchParams={searchParams}
    />
  );
};
export default Home;
