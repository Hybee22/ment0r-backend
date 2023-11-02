const bcrypt = require("bcryptjs");
const inquirer = require("inquirer");
const { v4 } = require("uuid");
const chalk = require("chalk");

const { Ment0r } = require("../../middleware/role");

const model = require("../../models");

const logger = require("../../logger").Logger;
const { createRole } = require("../../controllers/dao/db/role");
const { getCategories } = require("../../controllers/dao/db/category");

const confirmPasswordInput = async (input) => {
  return (
    input.length >= 8 &&
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(input)
  );
};

const confirmPhone = async (input) => {
  return input.length >= 1;
};

const initAdminAndSave = async (superAdminAccount) => {
  const data = await model.User.create(superAdminAccount);

  const log = chalk.green("[✔] Super admin created successfully");
  console.log(log);
  return data;
};

const categoryData = () => {
  const result = [];
  const categories = [
    "Graphics & Design",
    "Programming & Technology",
    "Marketing",
    "Health",
    "Agriculture",
    "Finance",
    "Video & Animation",
  ];
  for (let i = 0; i < categories.length; i++) {
    const id = v4();
    result.push({ categoryId: id, categoryName: categories[i] });
  }
  return result;
};

const seedSuperAdmin = async () => {
  let adminFromCommandLine = process.argv[2];
  if (adminFromCommandLine)
    [, adminFromCommandLine] = adminFromCommandLine.split("=");
  let logInit = chalk.yellowBright("[!] Initializing app...");
  console.log(logInit);

  // Check if Super Admin Roles Exist
  const rolesExists = await model.Role.findOne({
    where: { roleName: "ROL-SUPERADMIN" },
  });

  // Check if Categories Exist
  const categoryExists = await getCategories();
  if (categoryExists.length === 0) {
    await model.Category.bulkCreate(categoryData());
  }

  if (rolesExists) {
    logInit = chalk.green("[✔] Super admin already initialized");
    console.log(logInit);
  } else {
    await model.sequelize.sync();
    if (adminFromCommandLine !== "false") {
      inquirer
        .prompt([
          {
            name: "firstName",
            message: "First Name (default: admin)",
            default: "admin",
          },
          {
            name: "lastName",
            message: "Last Name (default: admin)",
            default: "admin",
          },
          {
            type: "password",
            name: "password",
            message: "password:",
            mask: "*",
            validate: confirmPasswordInput,
          },
          {
            name: "phone",
            message: "Phone number:",
            validate: confirmPhone,
          },
          {
            name: "email",
            message: "email (default: email@example.com)",
            default: "email@example.com",
          },
        ])
        .then(async (answers) => {
          // hash password
          const salt = bcrypt.genSaltSync(10);
          const userId = v4();
          const roleId = v4();

          // eslint-disable-next-line no-param-reassign
          answers.password = await bcrypt.hashSync(answers.password, salt);
          const superAdminAccount = {
            firstName: answers.firstName,
            lastName: answers.lastName,
            phoneNumber: answers.phone,
            email: answers.email,
            password: answers.password,
            userId,
            status: "1",
          };

          const roleInfo = {
            userId,
            roleId,
            roleName: Ment0r.superAdmin,
          };

          await initAdminAndSave(superAdminAccount);
          await createRole(roleInfo);
        });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const userId = v4();
      const roleId = v4();

      const password = await bcrypt.hashSync("AdminAdmin21#", salt);
      const superAdminAccount = {
        firstName: "admin",
        lastName: "admin",
        phoneNumber: "09000000000",
        email: process.env.FROM_EMAIL,
        password,
        userId,
        status: "1",
      };

      const roleInfo = {
        userId,
        roleId,
        roleName: Ment0r.superAdmin,
      };

      await initAdminAndSave(superAdminAccount);
      await createRole(roleInfo);
    }
  }
};

module.exports.seedSuperAdmin = seedSuperAdmin;
