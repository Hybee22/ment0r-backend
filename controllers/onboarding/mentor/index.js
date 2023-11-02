const model = require("../../../models");
const { v4 } = require("uuid");

const { successResMsg, errorResMsg } = require("../../../utils/libs/response");
const logger = require("../../../logger").Logger;
const {
  createMentor,
  getMentors,
  getMentorById,
} = require("../../dao/db/mentor");
const { updateProfileStatus } = require("../../dao/db/user");

const addMentorProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    // Check if profile has been created
    const hasProfile = await getMentorById(userId);

    if (!hasProfile) {
      // Onboarding Data
      const data = { ...req.body, UserUserId: userId };
      // Create Mentor Profile
      await createMentor(data);
      // Update Profile Created Status
      await updateProfileStatus(data.userId);

      return successResMsg(res, 201, {
        message: "Profile created successfully",
      });
    }

    return successResMsg(res, 200, {
      message: "Profile already created. Update profile instead",
    });
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "it is us, not you. Please try again");
  }
};

const allMentors = async (req, res) => {
  try {
    const mentors = await getMentors();

    if (!mentors) return errorResMsg(res, 404, { message: "No Mentors Found" });

    const dataInfo = {
      message: "Mentors Found",
      mentors,
    };
    return successResMsg(res, 200, dataInfo);
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "it is us, not you. Please try again");
  }
};

const mentorById = async (req, res) => {
  try {
    const { userId } = req.params;
    const mentor = await getMentorById(userId);

    if (!mentor) return errorResMsg(res, 404, { message: "Mentor Not Found" });

    const dataInfo = {
      message: "Mentor Found",
      mentor,
    };
    return successResMsg(res, 200, dataInfo);
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "it is us, not you. Please try again");
  }
};

module.exports = {
  createMentor: addMentorProfile,
  getMentor: mentorById,
  getMentors: allMentors,
};
