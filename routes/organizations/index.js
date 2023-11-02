const express = require("express");
const {
  getAllOrganizations,
  getOrganization,
  getOrganizationUsers,
  addUser,
} = require("../../controllers/organization");

const { authorize } = require("../../middleware/index");
const { User, Ment0r, Organization } = require("../../middleware/role");
const {
  OrganizationValidation,
} = require("../../utils/validators/organization/index");

const router = express.Router();

// Add User to Organization
router.post("/users/create", OrganizationValidation.validateAddUser, addUser);

// Get Users Under Organization
router.get("/:organizationId/users", getOrganizationUsers);

// Get Organizations
router.get("/", getAllOrganizations);
router.get("/:organizationId", getOrganization);

module.exports = { organizationRouter: router };
