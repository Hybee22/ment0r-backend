const { v4 } = require("uuid");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  process.env.GOOGLE_CLIENTID,
  process.env.GOOGLE_CLIENTSECRET,
  process.env.GOOGLE_CALLBACKURL
);

const {
  getUserByEmail,
  createUser,
  updateActivityTracking,
} = require("../../dao/db/user");
const { createRole, getRoleByUserId } = require("../../dao/db/role");
const { trackLogin } = require("../../dao/db/tracking");

const { successResMsg, errorResMsg } = require("../../../utils/libs/response");
const { getIp } = require("../../../utils/libs/get-Ip");
const { hashPassword } = require("../../../utils/libs/password");
const { sendEmail } = require("../../../utils/libs/send-email");
const { signJWT } = require("../../../utils/libs/token");
const {
  registerEmailContent,
} = require("../../../utils/templates/user-register-email");

const { User, Organization, Ment0r } = require("../../../middleware/role");
const logger = require("../../../logger").Logger;

const googleAuth = async (req, res) => {
  try {
    const { token, role } = req.body;
    // Verify generated token
    const { payload } = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENTID,
    });
    // Get user data from payload
    const email = payload.email;
    const givenName = payload.given_name;
    const familyName = payload.family_name;
    const googleId = payload.sub;

    //check whether user exist in database
    const userQuery = await getUserByEmail(email);

    // Login Date
    const date = new Date();
    // If user exist, login directly
    if (userQuery) {
      const user = userQuery.dataValues;

      let data = {
        userId: user.userId,
        email: user.email,
        profileCreated: user.profileCreated,
        userRole: user.Roles,
      };

      // SET sign in location and time
      const ipAddress = getIp(req);

      const a = await updateActivityTracking(user, ipAddress);

      // Track Login
      const dataToTrack = {
        userId: user.userId,
        signInDate: date,
        signInIp: ipAddress,
      };

      await trackLogin(dataToTrack);

      const _token = signJWT(data); //generating token

      const dataInfo = { message: "Login Successful!", token: _token };
      return successResMsg(res, 200, dataInfo);
    }

    // Else register user and login
    const userId = v4();
    const roleId = v4();
    const defaultRole = User.mentee;
    const defaultPassword = hashPassword("Ment0r12345678");

    const userInformation = {
      userId,
      firstName: givenName,
      lastName: familyName,
      email: email,
      phoneNumber: '08000000001',
      password: defaultPassword,
      provider: "google",
      googleId,
    };

    await createUser(userInformation);

    // if user signs up as a mentor -- update roles table
    if (role === User.mentor) {
      const data = {
        userId,
        roleId,
        roleName: User.mentor,
        UserUserId: userId,
      };
      await createRole(data);
    }

    const roleInformation = {
      userId,
      roleId,
      roleName: User.mentee,
      UserUserId: userId,
    };

    await createRole(roleInformation);

    const data = {
      userId,
      email: email,
    };

    const _token = signJWT(data);

    const verificationUrl = `${URL}/auth/email/verify/?verification_token=${_token}`;

    await sendEmail({
      email: email,
      subject: "Email Verification",
      message: await registerEmailContent(givenName, verificationUrl),
    });

    const dataInfo = {
      userId,
      message: "Registration successful. Verification email sent!",
    };
    return successResMsg(res, 201, dataInfo);
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "it is us, not you. Please try again");
  }
};

module.exports = {
  googleAuth,
};
