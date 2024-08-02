"use client";
import { IApartment } from "@/@types/apartment";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightIcon, StarFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  item: IApartment;
}

const ApartmentCard: React.FC<Props> = ({ item }) => {
  return (
    <Card className={"lg:w-[400px] sm:w-full"}>
      <CardHeader className="h-[140px]">
        <Link href={`/details/${item.id}`}>
          <CardTitle className="leading-relaxed hover:underline cursor-pointer ">
            {item.name}
          </CardTitle>
        </Link>
        <CardDescription>{item.address}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="h-[180px]">
          <Image
            src={item.imageUrl}
            alt={item.name}
            className="h-full rounded-sm w-full object-contain hover:scale-110 transition duration-300 ease-in "
            width={300}
            height={300}
            priority
          />
        </div>

        <div>
          <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none flex gap-2">
                {item.ratings.toString()} <StarFilledIcon />
              </p>
              <p className="text-sm text-muted-foreground">
                Price: {item.price.toString()} EGP
              </p>
              <p className="text-sm text-muted-foreground">
                ({item.ratings.toString()}) ratings
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/details/${item.id}`}>
          <Button variant={"outline"}>
            Goto apartment
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ApartmentCard;
