const express = require("express");
const {
  getMentor,
  getMentors,
  createMentor,
} = require("../../controllers/onboarding/mentor/index");

const { authorize } = require("../../middleware/index");
const { User, Ment0r, Organization } = require("../../middleware/role");
const { MentorValidation } = require("../../utils/validators/mentor/index");

const router = express.Router();

// Add Mentor Profile
router.post(
  "/",
  authorize(User.mentor),
  MentorValidation.validateMentor,
  createMentor
);

// Get Mentors
router.get("/", getMentors);

// Get Mentor
router.get("/:userId", getMentor);

module.exports = { mentorRouter: router };
