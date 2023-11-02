const express = require("express");
const { register } = require("../../controllers/auth/register");
const { registerOrganization } = require("../../controllers/auth/organization");
const { googleAuth } = require("../../controllers/auth/social");
const { login } = require("../../controllers/auth/login");
const { verifyEmail } = require("../../controllers/auth/verify-email");

const {
  resetPassword,
  forgotPassword,
  resendVerificationLink,
} = require("../../controllers/auth/reset-password");
const { authorize } = require("../../middleware/index");
const { User, Ment0r, Organization } = require("../../middleware/role");
const { UserValidation } = require("../../utils/validators/auth/index");
const {
  OrganizationValidation,
} = require("../../utils/validators/organization");

const router = express.Router();

// Registration and Login
router.post("/register", UserValidation.validateUser, register);
router.post(
  "/organization/register",
  OrganizationValidation.validateOrganization,
  registerOrganization
);
router.post("/google", googleAuth);
router.post("/login", UserValidation.validateLogin, login);

// Email Verification and Resend Verification
router.get("/email/verify", verifyEmail);
router.patch(
  "/email/verify/resend",
  UserValidation.resendVerificationLink,
  resendVerificationLink
);

// Forgot Password and Password Reset
router.post(
  "/password/reset",
  UserValidation.resendVerificationLink,
  forgotPassword
);
router.patch(
  "/password/reset/:resettoken",
  UserValidation.resetPassword,
  resetPassword
);

// Delete User
// router.delete('/:userId', authorize(Role.Admin), deleteUser);
module.exports = { authRouter: router };
