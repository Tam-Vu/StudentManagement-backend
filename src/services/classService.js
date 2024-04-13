import db, { Sequelize } from "../models/index";

const createNewClassService = async (classname, homeroomTeacher, gradeId) => {
  let checkClassName = {};
  try {
    checkClassName = await db.classes.findOne({
      where: {
        classname: classname,
      },
    });
    if (checkClassName) {
      return {
        EM: "Already have this class!!!",
        EC: 1,
        DT: "",
      };
    }
    if (gradeId == 1) {
      {
        if (!classname.startsWith("10")) {
          return {
            EM: "your Class don't match with your gradeId!!!",
            EC: 1,
            DT: "",
          };
        }
      }
    }
    if (gradeId == 2) {
      {
        if (!classname.startsWith("11")) {
          return {
            EM: "your Class don't match with your gradeId!!!",
            EC: 1,
            DT: "",
          };
        }
      }
    }
    if (gradeId == 3) {
      {
        if (!classname.startsWith("12")) {
          return {
            EM: "your Class don't match with your gradeId!!!",
            EC: 1,
            DT: "",
          };
        }
      }
    }
    let data = await db.classes.create({
      classname: classname,
      total: 0,
      classMonitor: null,
      homeroomTeacher: homeroomTeacher,
      gradeId: gradeId,
    });
    return {
      EM: "success",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong with service",
      EC: 0,
      DT: "",
    };
  }
};

const getAllClassService = async () => {
  let data = [];
  try {
    data = await db.classes.findAll();
    return {
      EM: "success",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: "",
    };
  }
};
const getAllClassByGradeService = async (gradeId) => {
  let data = {};
  try {
    console.log(gradeId);
    data = await db.classes.findAll({
      where: {
        gradeId: gradeId,
      },
      include: {
        model: db.grades,
        where: {
          id: Sequelize.col("classes.gradeId"),
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    });
    return {
      EM: "success",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: "",
    };
  }
};
module.exports = {
  createNewClassService,
  getAllClassService,
  getAllClassByGradeService,
};
