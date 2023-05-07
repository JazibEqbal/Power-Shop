const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

connectDB();

app.use(productRoutes);
app.use(cartRoutes);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server listening on port ${port}`));

// app.get("/v1/products", (req, res) => {
//   res.json(products);
// });
// app.get("/v1/products/:id", (req, res) => {
//   const product = products.find((prod) => prod.name === req.params.id);
//   res.json(product);
// });
