const { getUserById, deleteUserById } = require("../dao/impl/db/user");
const { successResMsg, errorResMsg } = require("../../Utils/libs/response");
const logger = require("../../logger").Logger;

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
  } catch (e) {
    logger.error(e.message);
    return errorResMsg(res, 500, "it is us, not you. Please try again later");
  }
};

module.exports = {
  deleteUser,
};
