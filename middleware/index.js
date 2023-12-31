const jwtExpress = require("express-jwt");
const { getUserById } = require("../controllers/dao/db/user");
const { errorResMsg } = require("../utils/libs/response");

const secret = process.env.JWT_SECRET;

// Check if your are authorized for the route
const authorize = (roles = []) => {
  if (typeof roles === "string") {
    // eslint-disable-next-line no-param-reassign
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    jwtExpress({ secret, algorithms: ["HS256"] }),

    // authorize based on user role
    (req, res, next) => {
      const userRoles = req.user.roles;
      const roleNames = userRoles.map((role) => role.roleName);

      if (roles.length && !roles.includes(...roleNames)) {
        // user's role is not authorized
        return errorResMsg(
          res,
          401,
          `User does not have permission to perform this action or access this route`
        );
      }

      // authentication and authorization successful
      next();
      return false;
    },
  ];
};

const accountActivated = (req, res, next) => {
  const { userId } = req.user;
  (async () => {
    const userData = await getUserById(userId);
    if (userData && userData.status === "0")
      return errorResMsg(res, 401, "Email needs to be verified first");
    next();
    return false;
  })();
};

module.exports = {
  authorize,
  accountActivated,
};
