/**
 * @swagger
 * /apartments:
 *   get:
 *     summary: Returns a list of apartments
 *     description: Retrieves a list of apartments from the database.
 *     tags:
 *       - Apartments
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "New Apartment"
 *                   address:
 *                     type: string
 *                     example: "789 Oak St"
 *                   city:
 *                     type: string
 *                     example: "Cairo"
 *                   state:
 *                     type: string
 *                     example: "CA"
 *                   zipCode:
 *                     type: string
 *                     example: "12345"
 *                   units:
 *                     type: string
 *                     example: "10"
 *                   imageUrl:
 *                     type: string
 *                     example: "http://localhost:8080/uploads/dd.jpg"
 *       500:
 *         description: Server error
 *
 *   post:
 *     summary: Creates a new apartment
 *     description: Adds a new apartment to the database. The image is uploaded as part of the request.
 *     tags:
 *       - Apartments
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Apartment"
 *               address:
 *                 type: string
 *                 example: "789 Oak St"
 *               city:
 *                 type: string
 *                 example: "Cairo"
 *               state:
 *                 type: string
 *                 example: "CA"
 *               zipCode:
 *                 type: string
 *                 example: "12345"
 *               units:
 *                 type: string
 *                 example: "10"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Apartment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "New Apartment"
 *                 address:
 *                   type: string
 *                   example: "789 Oak St"
 *                 city:
 *                   type: string
 *                   example: "Cairo"
 *                 state:
 *                   type: string
 *                   example: "CA"
 *                 zipCode:
 *                   type: string
 *                   example: "12345"
 *                 units:
 *                   type: string
 *                   example: "10"
 *                 imageUrl:
 *                   type: string
 *                   example: "http://localhost:8080/uploads/dd.jpg"
 *       400:
 *         description: Bad request, invalid input
 *       500:
 *         description: Server error
 *
 * /apartments/{id}:
 *   get:
 *     summary: Returns an apartment by ID
 *     description: Retrieves an apartment from the database by ID.
 *     tags:
 *       - Apartments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the apartment to return
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "New Apartment"
 *                 address:
 *                   type: string
 *                   example: "789 Oak St"
 *                 city:
 *                   type: string
 *                   example: "Cairo"
 *                 state:
 *                   type: string
 *                   example: "CA"
 *                 zipCode:
 *                   type: string
 *                   example: "12345"
 *                 units:
 *                   type: string
 *                   example: "10"
 *                 imageUrl:
 *                   type: string
 *                   example: "http://localhost:8080/uploads/dd.jpg"
 *       500:
 *         description: Server error
 */

import { Router } from "express";

import {
  createApartment,
  getAllApartments,
  getApartmentById,
} from "../controllers/apartment.controller";
import { upload } from "../middleware/multer.middleware";
const apartmentRouter = Router();

apartmentRouter.get("/", getAllApartments);
apartmentRouter.get("/:id", getApartmentById);
apartmentRouter.post("/", upload.single("image"), createApartment);

export default apartmentRouter;
