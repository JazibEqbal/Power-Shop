const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();
const bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use(express.json());
app.use(cors());

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const userRoutes = require("./routes/userRoutes");

connectDB();

app.use(userRoutes);
app.use(productRoutes);
app.use(cartRoutes);

port = process.env.PORT || 8080;

app.listen(port, console.log(`Server listening on port ${port}`));

// app.get("/v1/products", (req, res) => {
//   res.json(products);
// });
// app.get("/v1/products/:id", (req, res) => {
//   const product = products.find((prod) => prod.name === req.params.id);
//   res.json(product);
// });
