const { signJWT } = require("../../utils/libs/token");
const { comparePassword } = require("../../utils/libs/password");
const { getUserByEmail, updateActivityTracking } = require("../dao/db/user");
const { trackLogin } = require("../dao/db/tracking");
const { successResMsg, errorResMsg } = require("../../utils/libs/response");
const { getIp } = require("../../utils/libs/get-Ip");
const logger = require("../../logger").Logger;
const { getRolesByUserId } = require("../dao/db/role");

// const redisKeys = require('../dao/redis/redis-key-gen');
// const cache = new Cache();

const returnUser = async (req, res, email, password, data) => {
  try {
    // let isMentor = false;
    // let verificationStatus = 'Pending';

    // if (user && user.roles.includes(Role.Mentor)) {
    //   isEmployer = true;
    //   const mentor = await getMentor(user.userId);
    //   if (employer) {
    //     verificationStatus = mentor.verificationStatus;
    //   }
    // }

    const { user, roles } = data;

    if (user.block) {
      return errorResMsg(
        res,
        401,
        "User Blocked! Please contact an administrator."
      );
    }

    // Decrypting User Password
    const valid = comparePassword(password, user.password);
    // If password is correct
    if (valid) {
      let data = {
        userId: user.userId.toString(),
        email: user.email,
        profileCreated: user.profileCreated,
        roles,
      };

      // SET sign in location and time
      const currentUser = await getUserByEmail(email);
      const ipAddress = getIp(req);
      await updateActivityTracking(currentUser, ipAddress);

      const date = new Date();

      // Track Login
      const dataToTrack = {
        userId: currentUser.userId,
        signInDate: date,
        signInIp: ipAddress,
      };

      await trackLogin(dataToTrack);

      //   if (isMentor) {
      //     data = {
      //       ...data,
      //       verificationStatus,
      //     };
      //   }

      const token = signJWT(data);

      // set cache if not set
      //   const keyId = redisKeys.getHashKey(`email:${email.toString()}`);
      //   const userCacheData = await cache.get(keyId); // fetch from cache
      //   if (!userCacheData) await cache.set(keyId, user); // set email data to cache

      const dataInfo = { message: "Login Successful!", token };
      return successResMsg(res, 200, dataInfo);
    }
    // In the event of a wrong password
    return errorResMsg(res, 400, "Email or password incorrect!");
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "Something went wrong");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await getUserByEmail(email);
    if (userData) {
      const user = userData.dataValues;
      const roles = user.Roles;

      const data = { user, roles };
      return returnUser(req, res, email, password, { ...data });
    }
    return errorResMsg(res, 401, "Email or password incorrect");
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "it is us, not you. Please try again");
  }
};

module.exports = {
  login,
};
