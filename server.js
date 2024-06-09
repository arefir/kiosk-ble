import express from "express";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import asyncHandler from "./middleware/asyncHandler.js";
import bodyParser from "body-parser";
import { cafeMenu, fastFoodMenu } from "./menu.js";
import { saveOrder, getOrder, addToCart, getCart, emptyCart, login, logout, getUser } from "./dbController.js";
import cors from "cors";


const PORT = process.env.PORT || 5555;

const app = express();

app.use(bodyParser.json());
app.use(cors());

const getGeneralMenu = (restaurantId) => {
    switch (restaurantId) {
        case 1:
            return cafeMenu;
        case 2:
            return fastFoodMenu;
        default:
            return 1;
    }
};

const getPersonalMenu = (restaurantId) => {
    const orderHistory = getItems();
    const filtered = orderHistory.filter((item) => item.restaurantId == restaurantId);

    var generalMenu;

    switch (restaurantId) {
        case 1:
            generalMenu = cafeMenu;
        case 2:
            generalMenu = fastFoodMenu;
        default:
            return 1;
    }

    const menu = {
        personal: filtered,
        general: generalMenu
    };

    return menu;
};

app.get("/", (req, res) => {
    res.send("Running");
});

app.post("/test", asyncHandler(async (req, res) => {
    const { user, restaurant, table } = req.body;
    res.json({ user, restaurant, table });
}));

app.post("/login", asyncHandler(async (req, res) => {
    const { user, restaurant } = req.body;

    login(user, restaurant);

    res.json({ url: "http://localhost:3000/" });
}));

app.get("/getUser", asyncHandler(async (req, res) => {
    const userInfo = getUser();

    res.json({ user: userInfo.user, restaurant: userInfo.restaurant });
}));

app.post("/addCart", asyncHandler(async (req, res) => {
    const { item } = req.body;

    addToCart(item);

    res.json({ item });
}));

app.get("/getCart", asyncHandler(async (req, res) => {

    const cart = getCart();

    res.json({ cart });
}));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });

