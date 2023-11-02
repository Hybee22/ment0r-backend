const express = require("express");
const { getUsers, getUser } = require("../../controllers/user");

const { authorize } = require("../../middleware/index");
const { User, Ment0r, Organization } = require("../../middleware/role");

const router = express.Router();
// Get Categories
router.get("/", getUsers);
router.get("/:userId", getUser);

module.exports = { userRouter: router };
