require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


//My routes
const homeTabRoutes = require("./src/routes/home_tab");
const userRoutes = require("./src/routes/user");
const categoriesRoutes = require("./src/routes/categories");
const subCategoriesRoutes = require("./src/routes/sub_categories");
const productsListRoutes = require("./src/routes/products_list");
const productRoute = require('./src/routes/product');
const userProfile = require('./src/routes/user_profile');
const brandsRoutes = require('./src/routes/brands');
const influencerRoutes = require('./src/routes/influencer');
const orderRoutes = require('./src/routes/order');

//Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", homeTabRoutes);
app.use("/api", userRoutes);
app.use("/api", categoriesRoutes);
app.use("/api", subCategoriesRoutes);
app.use("/api", productsListRoutes);
app.use('/api', productRoute);
app.use('/api', userProfile);
app.use('/api', brandsRoutes);
app.use('/api', influencerRoutes);
app.use('/api', orderRoutes);

//PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
