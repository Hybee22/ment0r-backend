const model = require("../../models");
const { v4 } = require("uuid");
const {
  getOrganizationById,
  getOrganizations,
  createOrganization,
  updateOrganization,
} = require("../dao/db/organization");
const { getUserByOrganizationId } = require("../dao/db/user");

const { successResMsg, errorResMsg } = require("../../utils/libs/response");
const logger = require("../../logger").Logger;
const { updateUser, getUserById } = require("../dao/db/user");

const createAnOrganization = async (req, res) => {
  try {
    const organizationId = v4();
    const data = { ...req.body, organizationId };

    await createOrganization(data);

    const dataInfo = {
      message:
        "You have successfully set up an organization. Verification email sent!",
    };

    // Send Verification Mail
    // TODO

    return successResMsg(res, 201, dataInfo);
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "it is us, not you. Please try again");
  }
};

const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await getOrganizations();

    if (!organizations)
      return errorResMsg(res, 404, { message: "Organization Not Found" });

    const dataInfo = {
      message: "Organizations Found",
      organizations,
    };
    return successResMsg(res, 200, dataInfo);
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "it is us, not you. Please try again");
  }
};

const getOrganization = async (req, res) => {
  try {
    const { organizationId } = req.params;
    const organization = await getOrganizationById(organizationId);

    if (!organization)
      return errorResMsg(res, 404, { message: "Organization Not Found" });

    const dataInfo = {
      message: "Organization Found",
      organization,
    };
    return successResMsg(res, 200, dataInfo);
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "it is us, not you. Please try again");
  }
};
const getOrganizationUsers = async (req, res) => {
  try {
    const { organizationId } = req.params;
    const users = await getUserByOrganizationId(organizationId);

    const dataInfo = {
      message: "Users Found",
      users,
    };

    return successResMsg(res, 200, dataInfo);
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "it is us, not you. Please try again");
  }
};

const addUser = async (req, res) => {
  try {
    // Update user table with organization Id
    const { userId, organizationId } = req.body;
    // check if user exist and is not blocked
    const user = await getUserById(userId);
    if (!user) return errorResMsg(res, 404, { message: "User Not Found" });
    if (user.organizationId)
      return errorResMsg(res, 400, {
        message:
          "User already belong to an organization. Please contact an administrator for further information.",
      });
    // Updating table
    if (!user.block) {
      await updateUser(
        { userId },
        { organizationId, OrganizationOrganizationId: organizationId }
      );

      const { companyName } = await getOrganizationById(organizationId);

      const dataInfo = {
        message: `You have been added to Organization "${companyName}"`,
      };
      return successResMsg(res, 201, dataInfo);
    }
    return successResMsg(res, 201, {
      message: "User has been blocked. Please contact an adminstrator",
    });
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "it is us, not you. Please try again");
  }
};

module.exports = {
  getAllOrganizations,
  getOrganization,
  getOrganizationUsers,
  addUser,
};
