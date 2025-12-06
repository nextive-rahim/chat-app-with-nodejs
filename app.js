
/// External Import
const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const path = require("path");
const cookieparser = require("cookie-parser");

/// Internal Import
const { notFoundErrorHandler, errorHandler } = require("./middlewares/common/error_handler");
const loginRouter=require('./router/loginRouter')
const inboxRouter=require('./router/inboxRouter')
const userRouter=require('./router/userRouter')

const app = express();
dotenv.config()

mongoose.connect(process.env.Mongosse_Connection).then((v) => console.log("Database Connection Successfully")).catch((error) => console.log(error));

/// Request Parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/// View enginee
app.set("view engine", "ejs");

/// set static
app.use(express.static(path.join(__dirname, "public")));

/// parse cookie
app.use(cookieparser(process.env.Cookie_Secret));

/// Router Setup
app.use('/',loginRouter)
app.use('/',userRouter)
app.use('/',inboxRouter)

/// 404not found error
app.use(notFoundErrorHandler);

/// Common Error handler
app.use(errorHandler);


app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
