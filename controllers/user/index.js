const model = require("../../models");
const { v4 } = require("uuid");

const { getUsers, getUserById } = require("../dao/db/user");

const { successResMsg, errorResMsg } = require("../../utils/libs/response");
const logger = require("../../logger").Logger;

const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();

    const dataInfo = {
      message: "Users Found",
      count: users.length,
      users,
    };
    return successResMsg(res, 200, dataInfo);
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "it is us, not you. Please try again");
  }
};

const getAUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await getUserById(userId);

    if (!user) return errorResMsg(res, 404, { message: "User not found" });

    const dataInfo = {
      message: "User Found",
      user,
    };
    return successResMsg(res, 200, dataInfo);
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "it is us, not you. Please try again");
  }
};

module.exports = {
  getUsers: getAllUsers,
  getUser: getAUser,
};
