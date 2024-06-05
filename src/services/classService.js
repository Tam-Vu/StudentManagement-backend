import { where } from "sequelize";
import db, { Sequelize, sequelize } from "../models/index";
import subjects from "../models/subjects";

const createNewClassService = async (classname,total,homeroomTeacher,gradeId) => {
  let checkHomeRoomTeacher = {};
  let gradename;
  let getGrade = {};

  getGrade = await db.grades.findOne({
    where: {
      id: gradeId,
    },
  });
  console.log("Grade name: " + getGrade.gradename);

  gradename = getGrade.gradename;

  if (gradename == 10) {
    if (!classname.startsWith("10")) {
      return {
        EM: "your Class don't match with your grade!!!",
        EC: 1,
        DT: "",
      };
    }
  } else if (gradename == 11) {
    if (!classname.startsWith("11")) {
      return {
        EM: "your Class don't match with your grade!!!",
        EC: 1,
        DT: "",
      };
    }
  } else {
    if (!classname.startsWith("12")) {
      return {
        EM: "your Class don't match with your grade!!!",
        EC: 1,
        DT: "",
      };
    }
  }
  let checkClassName = {};
  try {
    checkClassName = await db.classes.findOne({
      where: {
        classname: classname,
        gradeId: gradeId,
      },
    });
    if (checkClassName) {
      return {
        EM: "Already have this class!!!",
        EC: 1,
        DT: "",
      };
    }
    checkHomeRoomTeacher = await db.classes.findOne({
      where: {
        homeroomTeacher: homeroomTeacher,
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
    if (checkHomeRoomTeacher && homeroomTeacher != null) {
      return {
        EM: "Already have this homeroom teacher in another class!!!",
        EC: 1,
        DT: "",
      };
    }
    let data = await db.classes.create({
      classname: classname,
      total: total,
      classMonitor: null,
      homeroomTeacher: homeroomTeacher,
      gradeId: gradeId,
    });

    let subjects = await db.subjects.findAll({
      where: {
        isdeleted: 0,
      }
    });

    for (const subject of subjects) {
      await db.assignments.create({
        classId: data.id,
        subjectId: subject.id,
      });
    }

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
const getAllClassByGradeService = async (gradename, year) => {
  let data = [];
  let getYear = {};
  if (year == "") {
    getYear = await db.grades.max("year");
    console.log("getYear " + getYear + typeof getYear);
    year = getYear;
  }
  try {
    data = await db.classes.findAll({
      include: {
        model: db.grades,
        where: {
          id: Sequelize.col("classes.gradeId"),
          gradename: gradename,
          year: year,
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

const getAllStudentSummariesByClassId = async(classId) => {
  try {
    let data = await db.schoolreports.findAll({
      include: [
        {
          model: db.students,
          attributes: ['studentname']
        },
        {
          model: db.classes,
          attributes: ['classname'],
          where: {
            id: classId
          }
        }
      ]
    })
    return {
      EM: "success",
      EC: 0,  
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "can't find student",
      EC: 1,
      DT:"",
    };
  }
}

const getAllClassesByTeacherId = async(teacherId) => {
  try {
    let classes = await db.classes.findAll({
      include:[
        {
          model: db.assignments,
          attributes:['classId', 'classId'],
          include: [
            {
              model: db.teachers,
              attributes: ['teachername', 'gender', 'id']
            }
          ],
          where: {
            teacherId: teacherId,
          }
        }
      ],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    })
    return {
      EM: "success.",
      EC: 0,
      DT: classes,
    }
  } catch(e) {
    console.log(e);
    return {
      EM: "find any classes by this teacher",
      EC: 1,
      DT:"",
    };
  }
}

module.exports = {
  createNewClassService,
  getAllClassService,
  getAllClassByGradeService,
  getAllStudentSummariesByClassId,
  getAllClassesByTeacherId,
}
