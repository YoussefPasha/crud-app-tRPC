import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { putUri } from "../service/s3-ninja.service";
import { createApartmentSchema } from "../validation/apartment.schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import logger from "../config/logger";

const apartmentClient = new PrismaClient().apartment;

// get All Apartments

export const getAllApartments = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, priceLow, priceHigh, rating } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    const filters: {
      price?: { gte?: number; lte?: number };
      ratings?: { gte?: number };
    } = {};

    if (priceLow !== undefined) {
      filters.price = { ...filters.price, gte: parseFloat(priceLow as string) };
    }
    if (priceHigh !== undefined) {
      filters.price = {
        ...filters.price,
        lte: parseFloat(priceHigh as string),
      };
    }
    if (rating !== undefined) {
      filters.ratings = { gte: parseFloat(rating as string) };
    }

    const skip = (pageNum - 1) * limitNum;

    const getAllApartments = await apartmentClient.findMany({
      where: filters,
      select: {
        id: true,
        name: true,
        address: true,
        imageUrl: true,
        createdAt: true,
        price: true,
        ratings: true,
      },
      // skip,
      // take: limitNum,
    });

    const totalApartments = await apartmentClient.count({
      where: filters,
    });

    res.status(200).json({
      data: getAllApartments,
      total: totalApartments,
      page: pageNum,
      totalPages: Math.ceil(totalApartments / limitNum),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error when fetching apartments" });
  }
};

// get Apartment by ID

export const getApartmentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const apartment = await apartmentClient.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!apartment) {
      return res.status(404).json({ message: "Apartment not found" });
    }
    res.status(200).json({ data: apartment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error when fetching apartment" });
  }
};

// create Apartment

export const createApartment = async (req: Request, res: Response) => {
  const { name, address, city, state, zipCode, units, price, ratings } =
    req.body;
  try {
    if (!req.file) {
      return res.status(400).send({
        message: "Validation error",
        errors: [{ path: "imageUrl", message: "Image is required" }],
      });
    }

    // validate request body
    createApartmentSchema.parse(req.body);

    const buffer = req.file.buffer;
    const base64Data = buffer.toString("base64");
    const dataUri = `data:${req.file.mimetype};base64,${base64Data}`;

    const imageUrl = await putUri(dataUri, {
      key: `${+new Date()}_apartment_img_${req.file.originalname}`,
      prefix: "apartment",
    });

    const apartment = await apartmentClient.create({
      data: {
        name,
        address,
        imageUrl: imageUrl?.url,
        city,
        state,
        zipCode,
        units,
        price: parseFloat(price),
        ratings: parseFloat(ratings),
      },
    });
    res.status(201).json({ data: apartment });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationError = fromZodError(error, {
        unionSeparator: ", ",
        prefixSeparator: " ",
        prefix: "",
      });

      res.status(400).json({
        message: validationError.toString(),
        errors: validationError,
      });
    } else {
      res.status(500).json({ message: "Error when creating apartment" });
      logger.error("Error when creating apartment", error);
    }
  }
};
