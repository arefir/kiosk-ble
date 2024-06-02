import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import asyncHandler from "./middleware/asyncHandler.js";
import bodyParser from "body-parser";


const PORT = process.env.PORT || 5555;

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Running");
});

app.post("/test", asyncHandler(async (req, res) => {
    const { user, restaurant, table } = req.body;
    res.json({ user, restaurant, table });
}));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });

