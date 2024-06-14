import { where } from "sequelize";
import db, { sequelize } from "../models/index";
import QueryTypes from "sequelize";
import bcrypt from "bcryptjs";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import config from "../config/firebasestorage";

const app = initializeApp(config.firebaseConfig);
const storage = getStorage();

const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (userPass) => {
  let hashPassword = bcrypt.hashSync(userPass, salt);
  return hashPassword;
};

const serviceCreateNewTeacher = async (data, image) => {
  try {
    if (
      !data.teachername ||
      !data.birthDate ||
      !data.startDate ||
      !data.gender
    ) {
      return {
        EM: "All fields are required!!!",
        EC: 1,
        DT: [],
      };
    } else {
      let params = await db.params.findAll({
        where: {},
        raw: true,
      });
      function getParamValue(paramName) {
        for (let param of params) {
          if (param["paramName"] == paramName) {
            return param["paramValue"];
          }
        }
      }

      let checkemail = await db.User.findOne({
        where: {
          email: data.email,
        },
      });
      if (checkemail) {
        return {
          EM: "this email is already used",
          EC: 1,
          DT: "",
        };
      }
      let slug = getParamValue("teacherSlug");
      let userandpass = `giaovien${String(slug).padStart(4, "0")}`;
      let hashPass = hashUserPassword(userandpass);

      let downloadURL = null;
      if (image != null) {
        const storageRef = ref(storage, `image/${image.originalname}`);
        const metadata = {
          contentType: image.mimetype,
        };
        const snapshot = await uploadBytesResumable(
          storageRef,
          image.buffer,
          metadata
        );
        downloadURL = await getDownloadURL(snapshot.ref);
      }
      let teacherAccount = await db.User.create({
        username: userandpass,
        password: hashPass,
        email: data.email,
        image: downloadURL,
        groupId: 2,
        isLocked: 0,
      });

      let res = await db.teachers.create({
        teachername: data.teachername,
        birthDate: data.birthDate,
        startDate: data.startDate,
        subjectId: data.subjectId,
        gender: data.gender,
        userId: teacherAccount.id,
      });

      await db.params.update(
        {
          paramValue: slug + 1,
        },
        {
          where: {
            paramName: "teacherSlug",
          },
        }
      );

      return {
        EM: "success",
        EC: 0,
        DT: res,
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: [],
    };
  }
};

const getAllTeacherService = async () => {
  let data = [];
  try {
    data = await db.teachers.findAll({
      include: [
        {
          model: db.User,
          where: {
            isLocked: 0,
          },
          attributes: ["image", "username"],
        },
        {
          model: db.subjects,
          attributes: ["subjectname"],
        },
      ],
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
      DT: data,
    };
  }
};

const getTeacherByIdService = async (id) => {
  try {
    let data = await db.teachers.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: db.User,
          attributes: ["image", "username", "email"],
        },
        {
          model: db.subjects,
          attributes: ["subjectname"],
        },
      ],
      attributes: ["teachername", "gender", "startDate"],
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

const updateTeacherService = async (data, id) => {
  try {
    let user = await db.teachers.findOne({
      where: { id: id },
    });
    if (user) {
      await user.update({
        teachername: data.teachername,
        birthDate: data.birthDate,
        startDate: data.startDate,
        subjectId: data.subjectId,
        gender: data.gender,
      });
      return {
        EM: "Update user succeeds",
        EC: 0,
        DT: "",
      };
    } else {
      return {
        EM: "User not found",
        EC: 1,
        DT: "",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with service",
      EC: 1,
      DT: "",
    };
  }
};

const deleteTeacherService = async (id) => {
  try {
    let teacher = await db.teachers.findOne({
      where: {
        id: id,
      },
      include: {
        model: db.User,
      },
    });
    if (teacher) {
      let user = teacher.User;
      await user.update({
        isLocked: 1,
      });
      return {
        EM: "Delete Succeed!!!",
        EC: 0,
        DT: "",
      };
    } else {
      return {
        EM: "User not found!!!",
        EC: 1,
        DT: "",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with service!!!",
      EC: 1,
      DT: "",
    };
  }
};

const getAllClassNotAssignBySubject = async (teacherId, year) => {
  let subjectId = await db.teachers.findOne({
    where: {
      id: teacherId,
    },
    attributes: ["subjectId"],
  });
  let classes = await sequelize.query(
    `select * from classes 
  where classes.id not in (select classes.id from classes left join assignments 
  on classes.id = assignments.classId left join grades on grades.id = classes.gradeId
  left join teachers on assignments.teacherId = teachers.id
  where teachers.subjectId = :subjectid and grades.year = :year)`,
    {
      replacements: { subjectid: subjectId.subjectId, year: year },
      type: sequelize.QueryTypes.SELECT,
    }
  );
  return {
    EM: "success.",
    EC: 1,
    DT: classes,
  };
};

const getAllTeacherBySubjectName = async (subjectName) => {
  try {
    let subjectTemp = await db.subjects.findOne({
      where: {
        subjectname: subjectName,
      },
    });
    let subject = subjectTemp.get({ plain: true });
    console.log(subject);
    let teacher = await db.findAll({
      where: {
        subjectId: subject.id,
      },
    });
    return {
      EM: "success.",
      EC: 0,
      DT: teacher,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "can't find any teacher!!!",
      EC: 1,
      DT: "",
    };
  }
};

const getAllTeacherForEachSubject = async () => {
  try {
    let data = await db.subjects.findAll({
      attributes: ["subjectname", "id"],
      include: [
        {
          model: db.teacher,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    return {
      EM: "success.",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "wrong subject or this school doesn't have teachers!!!",
      EC: 1,
      DT: "",
    };
  }
};

const getAllTeacherBySubjectId = async (subjectId) => {
  try {
    let data = await db.teachers.findAll({
      where: {
        subjectId: subjectId,
      },
      attributes: ["id", "teachername", "gender"],
      include: [
        {
          model: db.subjects,
          attributes: ["subjectname"],
        },
        {
          model: db.User,
          where: {
            isLocked: 0,
          },
          attributes: [],
        },
      ],
    });
    return {
      EM: "success",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "teacher not found",
      EC: 1,
      DT: "",
    };
  }
};

module.exports = {
  serviceCreateNewTeacher,
  getAllTeacherService,
  getTeacherByIdService,
  updateTeacherService,
  deleteTeacherService,
  getAllClassNotAssignBySubject,
  getAllTeacherBySubjectName,
  getAllTeacherForEachSubject,
  getAllTeacherBySubjectId,
};
