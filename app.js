require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const { errorHandler } = require("./middleware/error-handler");
const { seedSuperAdmin } = require("./utils/libs/seed");
const { successResMsg } = require("./utils/libs/response");

const db = require("./models");

const { authRouter } = require("./routes/auth/index");
const { organizationRouter } = require("./routes/organizations");
const { categoryRouter } = require("./routes/category");
const { mentorRouter } = require("./routes/mentor");
const { fileRouter } = require("./routes/files");
const { userRouter } = require("./routes/user");
const { postsRoute } = require("./routes/post");
const { commentsRoute } = require("./routes/comment");

const app = express();

// MIDDLEWARES
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(upload.any());

// CORS
app.use(cors());
// SEED DEFAULTS
db.sequelize.sync().then(async () => {
  await seedSuperAdmin();
});

// Default Route
app.get("/", (req, res) => {
  return successResMsg(res, 200, { message: "Ment0r. API" });
});

// File upload
// app.use(fileupload({ useTempFiles: true }));

// ************ REGISTER ROUTES HERE ********** //
app.use("/v1/auth", authRouter);
app.use("/v1/organizations", organizationRouter);
app.use("/v1/categories", categoryRouter);
app.use("/v1/mentors", mentorRouter);
app.use("/v1/files", fileRouter);
app.use("/v1/users", userRouter);
app.use("/v1/posts", postsRoute);
app.use("/v1/comments", commentsRoute);
// ************ END ROUTE REGISTRATION ********** //

// Global error handler
app.use(errorHandler);

module.exports = app;
