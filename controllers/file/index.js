const model = require("../../models");
const { v4 } = require("uuid");
const { successResMsg, errorResMsg } = require("../../utils/libs/response");
const { uploadS3 } = require("../../utils/libs/upload-file");
const logger = require("../../logger").Logger;
const { createFile, getFilesByUserId } = require("../dao/db/file");

const imageSize = 5120;
const singleImageUpload = uploadS3.single("image");
const singleFileUpload = uploadS3.single("document");

const uploadImageFile = async (req, res) => {
  try {
    const fileTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!req.file)
      return errorResMsg(res, 400, {
        message: "Image file required",
      });
    if (!fileTypes.includes(req.file.mimetype))
      return errorResMsg(res, 400, {
        message: "Invalid file type, only JPG, JPEG and PNG is allowed!",
      });
    if (Math.round(req.file.size / 1000) > imageSize)
      return errorResMsg(res, 400, {
        message: `file size is larger than ${imageSize}kb`,
      });

    //   Upload Here
    let fileUrl = "";
    singleImageUpload(req, res, (err) => {
      if (err) return errorResMsg(res, 400, { message: "Image upload error" });
      fileUrl = req.file.location;
      if (fileUrl !== "") {
        //   return fileUrl;
        const { userid, name } = req.headers;
        //   Create File Data for user
        const fileId = v4();

        const data = {
          userId: userid,
          fileName: name,
          fileId,
          fileUrl,
          UserUserId: userid,
        };

        createFile(data);
      }
      return successResMsg(res, 200, {
        message: "Image Upload Successful",
      });
    });
  } catch (err) {
    logger.error(JSON.stringify(err));
    logger.error(err.message);
  }
};

const uploadDocumentFile = async (req, res) => {
  try {
    const fileTypes = [
      "application/pdf",
      "application/msword",
      "text/plain",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!req.file)
      return errorResMsg(res, 400, {
        message: "Image file required",
      });
    if (!fileTypes.includes(req.file.mimetype))
      return errorResMsg(res, 400, {
        message: "Invalid file type, only PDF, DOC, DOCX and TXT is allowed!",
      });
    if (Math.round(req.file.size / 1000) > imageSize)
      return errorResMsg(res, 400, {
        message: `file size is larger than ${imageSize}kb`,
      });

    //   Upload Here
    let fileUrl = "";
    singleFileUpload(req, res, (err) => {
      if (err) return errorResMsg(res, 400, { message: "File upload error" });
      fileUrl = req.file.location;
      if (fileUrl !== "") {
        //   return fileUrl;
        const { userid, name } = req.headers;
        //   Create File Data for user
        const fileId = v4();
        const data = {
          userId: userid,
          fileName: name,
          fileId,
          fileUrl,
          UserUserId: userid,
        };

        createFile(data);
      }
      return successResMsg(res, 200, {
        message: "File Upload Successful",
      });
    });
  } catch (err) {
    logger.error(JSON.stringify(err));
    logger.error(err.message);
  }
};

const getUserFiles = async (req, res) => {
  try {
    const { userId } = req.params;
    const files = await getFilesByUserId(userId);

    if (!files) return errorResMsg(res, 404, { message: "Files Not Found" });

    const dataInfo = {
      message: "User Files Found",
      count: files.length,
      files,
    };
    return successResMsg(res, 200, dataInfo);
  } catch (error) {
    logger.error(error);
    return errorResMsg(res, 500, "it is us, not you. Please try again");
  }
};

module.exports = {
  uploadImageFile,
  uploadDocumentFile,
  getUserFiles,
};
