const model = require("../../models");
const { v4 } = require("uuid");
const { successResMsg, errorResMsg } = require("../../utils/libs/response");
const logger = require("../../logger").Logger;

const createGroup = () => {
  try {
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "it is us, not you. Please try again");
  }
};

const addMentee = () => {
  try {
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "it is us, not you. Please try again");
  }
};
