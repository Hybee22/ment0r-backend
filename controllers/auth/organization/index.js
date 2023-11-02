const { v4 } = require("uuid");
const model = require("../../../models");
const { sendEmail } = require("../../../utils/libs/send-email");
const {
  getUserByEmail,
  createUser,
  getUserByPhoneNumber,
} = require("../../dao/db/user");
const {
  getOrganizationByEmail,
  createOrganization,
} = require("../../dao/db/organization");
const { createRole } = require("../../dao/db/role");

const { signJWT } = require("../../../utils/libs/token");
const { hashPassword } = require("../../../utils/libs/password");
const { successResMsg, errorResMsg } = require("../../../utils/libs/response");
const {
  registerEmailContent,
} = require("../../../utils/templates/user-register-email");

const { User, Organization } = require("../../../middleware/role");

const logger = require("../../../logger").Logger;
const { getCategory } = require("../../dao/db/category");

const URL =
  process.env.NODE_ENV === "development"
    ? process.env.DEV_URL
    : process.env.FRONT_END_URL;

const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      companyName,
      categoryId,
      categoryName,
      address,
      email,
      password,
    } = req.body;

    const userExists = await getUserByEmail(email);
    const organizationExists = await getOrganizationByEmail(email);

    const phoneExists = await getUserByPhoneNumber(phoneNumber);
    if (phoneExists && phoneExists.phoneNumber === phoneNumber)
      return errorResMsg(res, 403, "Phone Number is not available");

    if (categoryId) {
      const categoryExists = await getCategory(categoryId);
      if (!categoryExists)
        return errorResMsg(res, 403, "Category is not available");
    }

    if (
      userExists &&
      userExists.email === email &&
      organizationExists &&
      organizationExists.email === email
    )
      return errorResMsg(res, 403, "Email is not available");

    // If CategoryName is supplied, check if it exist or create another then supply categoryId to process organization signup
    let newCategoryId;
    if (categoryName) {
      const newCatId = v4();
      const [category] = await model.Category.findOrCreate({
        where: { categoryName },
        defaults: { categoryId: newCatId },
      });
      newCategoryId = category.categoryId;
    }

    const hashedPassword = hashPassword(password);
    const userId = v4();
    const organizationId = v4();
    const roleId = v4();
    const orgRoleId = v4();

    const data = {
      userId,
      email,
    };

    const token = signJWT(data);

    // User Data
    const userInformation = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
      userId,
      organizationId,
      OrganizationOrganizationId: organizationId,
    };

    const organizationInformation = {
      companyName,
      email,
      address,
      categoryId: categoryId || newCategoryId,
      userId,
      organizationId,
      CategoryCategoryId: categoryId || newCategoryId,
    };

    const roleInformation = {
      userId,
      roleId,
      roleName: User.mentee,
      UserUserId: userId,
    };

    const organizationRoleInfo = {
      userId,
      roleId: orgRoleId,
      roleName: Organization.admin,
      UserUserId: userId,
    };

    // Create Organization
    await createOrganization(organizationInformation);
    // Create User
    await createUser(userInformation);
    // User Role - Defaults to Mentee
    await createRole(roleInformation);
    // Organization Role - Set to Organization admin
    await createRole(organizationRoleInfo);

    const verificationUrl = `${URL}/auth/email/verify/?verification_token=${token}`;

    await sendEmail({
      email,
      subject: "Email Verification",
      message: await registerEmailContent(companyName, verificationUrl),
    });

    const dataInfo = {
      message: "Registration successful. Verification email sent!",
    };

    return successResMsg(res, 201, dataInfo);
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "it is us, not you. Please try again");
  }
};

module.exports = {
  registerOrganization: register,
};
