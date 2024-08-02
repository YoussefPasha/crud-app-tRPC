"use client";

import { IApartmentsAPIResponse } from "@/@types/apartment";
import React, { useEffect } from "react";
import { useApartmentsList } from "@/apis";
import { useSearchParams } from "next/navigation";
import useIsInitialSearchParamSimilar from "@/hooks/use-is-search-params-similar";
import ApartmentCard from "../apartment";
import FormProvider from "@/providers/form-provider";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import useFilterHandler from "@/hooks/use-filter-handler";

const formSchema = z
  .object({
    rating: z.string().optional(),
    priceLow: z.string().optional(),
    priceHigh: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.priceLow !== undefined && data.priceHigh !== undefined) {
        return Number(data.priceLow) <= Number(data.priceHigh);
      }
      return true;
    },
    {
      path: ["priceLow", "priceHigh"],
    }
  );

const ApartmentsListScreen = ({
  initialApartmentsListResponse,
  initialSearchParams,
}: {
  initialApartmentsListResponse: IApartmentsAPIResponse | undefined;
  initialSearchParams: any;
}) => {
  const searchParams = useSearchParams();

  const isSimilar = useIsInitialSearchParamSimilar(initialSearchParams);
  const { loader, setLoader, debouncedFilterHandler } = useFilterHandler();
  const { data: apartmentsListData, isLoading } = useApartmentsList({
    initialValues: isSimilar ? initialApartmentsListResponse : undefined,
    params: searchParams,
  });

  const methods = useForm({
    defaultValues: {
      rating: undefined,
      priceLow: undefined,
      priceHigh: undefined,
    },
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, control, setValue } = methods;

  useEffect(() => {
    const ratingsParam: any = searchParams.get("rating") || undefined;
    const minPriceParam: any = searchParams.get("priceLow") || undefined;
    const maxPriceParam: any = searchParams.get("priceHigh") || undefined;

    setValue("rating", ratingsParam, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("priceLow", minPriceParam, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("priceHigh", maxPriceParam, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [searchParams]);

  const onSubmit = (data: any) => {
    setLoader(true);
    debouncedFilterHandler(data);
  };

  return (
    <div
      className="max-w-8xl 
        mx-auto space-y-10 mt-12"
    >
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>just a filter 😎</CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider
            className="space-y-5"
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              control={control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Input placeholder="rating⭐" {...field} />
                  </FormControl>
                  <FormDescription>
                    add rating and we will display all apartments with this
                    rating and above
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between gap-2 items-center">
              <FormField
                control={control}
                name="priceLow"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Price</FormLabel>
                    <FormControl>
                      <Input placeholder="minimum price" {...field} />
                    </FormControl>
                    <FormDescription>
                      add minimum price and we will display all apartments with
                      this price and above
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FaArrowRightLong className="h-4 w-4 md:block hidden" />
              <FormField
                control={control}
                name="priceHigh"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Price</FormLabel>
                    <FormControl>
                      <Input placeholder="Maximum Price" {...field} />
                    </FormControl>
                    <FormDescription>
                      add maximum price and we will display all apartments with
                      this price and below
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading || loader ? <Loader /> : <p>Apply Filters</p>}
            </Button>
          </FormProvider>
        </CardContent>
      </Card>
      {apartmentsListData?.data?.length === 0 && (
        <div className="text-center text-2xl font-bold">
          No apartments found
        </div>
      )}
      <div
        className="
        grid sm:grid-cols-1 
        lg:grid-cols-2 xl:grid-cols-3
        lg:p-10
        sm:p-5
        p-2
        gap-5 
        
        mb-10"
      >
        {apartmentsListData?.data.map((item) => (
          <ApartmentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ApartmentsListScreen;
