const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");

const db = require("./db");
const userRouter = require("./routes/user-router");

const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:8000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(helmet());
app.use(
  session({
    secret: "secretCode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretCode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/api", userRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
