const express = require("express");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const fileUpload = require("express-fileupload");

const database = require("./config/database");
const userRoute = require("./routes/userRoute");
const bookRoute = require("./routes/bookRoute");

dotenv.config();
database.connect();
const app = express();
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

//middleware
app.use(express.json());
app.use(express.static("public"));
app.use(fileUpload());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

//routing

app.use("/users", userRoute);
app.use("/books", bookRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
