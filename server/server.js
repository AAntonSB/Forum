const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");
const cookieParser = require("cookie-parser");

if (process.env.NODE_ENV !== "production") {
  // Load environment variables from .env file in non prod environments
  require("dotenv").config();
}
require("./db");

require("./strategies/JwtStrategy");
require("./strategies/LocalStrategy");
require("./authenticate");

const userRouter = require("./routes/userRoutes");
const roleRouter = require("./routes/roleRoutes");
const subForumRouter = require("./routes/subForumRoutes");
const postRouter = require("./routes/postRouter");
const replyRouter = require("./routes/replyRouter");

// const userRouter = require("./routes1/user-router");
// const subForumRouter = require("./routes1/sub-forum-router");
// const postRouter = require("./routes1/post-router");

const app = express();
const apiPort = 3000;

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//Add the client URL to the CORS policy
const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(passport.initialize());

app.use("/users", userRouter);
app.use("/roles", roleRouter);
app.use("/subForums", subForumRouter);
app.use("/posts", postRouter);
app.use("/replies", replyRouter);

app.use(helmet());

app.get("/", function (req, res) {
  res.send({ status: "success" });
});

const server = app.listen(process.env.PORT || 3000, function () {
  const port = server.address().port;
  console.log("App started at port:", port);
});
