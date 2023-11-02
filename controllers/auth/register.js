const { v4 } = require("uuid");
const { sendEmail } = require("../../utils/libs/send-email");
const {
  getUserByEmail,
  createUser,
  getUserByPhoneNumber,
} = require("../dao/db/user");
const { createRole } = require("../dao/db/role");

const { signJWT } = require("../../utils/libs/token");
const { hashPassword } = require("../../utils/libs/password");
const { successResMsg, errorResMsg } = require("../../utils/libs/response");
const {
  registerEmailContent,
} = require("../../utils/templates/user-register-email");

const { User, Organization, Ment0r } = require("../../middleware/role");

const logger = require("../../logger").Logger;

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
      email,
      password,
      addressLine1,
      addressLine2,
      country,
      city,
      state,
      postalCode,
      role,
    } = req.body;

    const userExists = await getUserByEmail(email);
    if (userExists && userExists.email === email)
      return errorResMsg(res, 403, "Email is not available");

    const phoneExists = await getUserByPhoneNumber(phoneNumber);
    if (phoneExists && phoneExists.phoneNumber === phoneNumber)
      return errorResMsg(res, 403, "Phone Number is not available");

    const hashedPassword = hashPassword(password);
    const userId = v4();
    const roleId = v4();

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
      addressLine1,
      addressLine2,
      country,
      city,
      state,
      postalCode,
      password: hashedPassword,
      userId,
    };

    await createUser(userInformation);

    const roleInformation = {
      userId,
      roleId,
      roleName: User.mentee,
      UserUserId: userId,
    };

    // if user signs up as a mentor -- update roles table
    if (role === User.mentor) {
      const data = {
        userId,
        roleId,
        roleName: User.mentor,
        UserUserId: userId,
      };
      await createRole(data);
    } else {
      await createRole(roleInformation);
    }
    const verificationUrl = `${URL}/auth/email/verify/?verification_token=${token}`;

    await sendEmail({
      email,
      subject: "Email Verification",
      message: await registerEmailContent(firstName, verificationUrl),
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
  register,
};
