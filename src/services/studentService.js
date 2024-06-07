import { where } from "sequelize";
import db, { sequelize } from "../models/index";
import bcrypt from "bcryptjs";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import config from "../config/firebasestorage"

const app = initializeApp(config.firebaseConfig);
const storage = getStorage();

const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (userPass) => {
  let hashPassword = bcrypt.hashSync(userPass, salt);
  return hashPassword;
};

const serviceCreateNewStudent = async (file ,studentname, birthDate, startDate, gender, address, email) => {
  try {
    let params = await db.params.findAll({
      where: {}, raw: true,
    })
    function getParamValue(paramName) {
        for(let param of params) {
            if(param['paramName'] == paramName) {
                return param['paramValue'];
            }
        }
    }

    let checkemail = await db.User.findOne({
      where: {
        email: email,
      }
    })
    if(checkemail) {
      return {
        EM: "this email is already used",
        EC: 1,
        DT: "",
      }
    }

    let maxAge = getParamValue("maxage");
    let minAge = getParamValue("minage");
    const today = new Date();

    let slug = getParamValue("studentSlug")
    let userandpass = `hocsinh${String(getParamValue("term"))}${String(slug).padStart(4,'0')}`
    let hashPass = hashUserPassword(userandpass);
    let downloadURL = null;
    if(file != null) {
      const storageRef = ref(storage, `image/${file.originalname}`);
      const metadata = {
        contentType: file.mimetype,
      };
      const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
      downloadURL = await getDownloadURL(snapshot.ref);
    }

    let studentAccount = await db.User.create({
      username: userandpass,
      password: hashPass,
      email: email,
      image: downloadURL,
      groupId: 4,
      isLocked: 0,
    });

    // let studentAccount = await accountService.serviceCreateNewAccount(userandpass, userandpass, email, 4);
    // console.log(studentAccount);


    let data = await db.students.create({
      studentname: studentname,
      birthDate: birthDate,
      startDate: startDate,
      gender: gender,
      address: address,
      userId: studentAccount.id,
      statusinyear: 0,
    });

    await db.params.update({
      paramValue: slug + 1,
    }, {
      where: {
        paramName: "studentSlug"
      }
    })

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
      DT: [],
    };
  }
};

const getAllStudentService = async () => {
  try {
    let students = await db.students.findAll({
      attributes: ['studentname', 'gender'],
      include: [
        {
          model: db.schoolreports,
          attributes:['concludecore'],
          include: [
            {
              model: db.classes,
              attributes: ['classname'],
              include: [
                {
                  model: db.grades,
                  attributes: ['gradename', 'year'],
                }
              ]
            }
          ]
        },
        {
          model: db.User,
          attributes: ['username', 'email', 'image'],
        },
      ]
    });
    let data = [];
    students.forEach(student => {
      student.schoolreports.forEach(report => {
        data.push({
          studentname: student.studentname,
          gender: student.gender,
          concludecore: report.concludecore,
          class: report.class.classname,
          grade: report.class.grade.gradename,
          year: report.class.grade.year,
          User: student.User
        });
      });
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

const getStudentByIdService = async (id) => {
  let data = {};
  data = await db.students.findByPk(id);
  return data.get({ plain: true });
};

const updateStudentService = async (data, id, btcId) => {
  try {
    let user = await db.students.findOne({
      where: { id: id },
    });
    console.log("USER: ", user.get({ raw: true }));
    if (user) {
      await user.update({
        studentname: data.studentname,
        birthDate: data.birthDate,
        gender: data.gender,
        address: data.address,
        parentId: data.parentId,
      });
      if (data.gradeId && data.classId) {
        console.log("UPDATE");
        console.log(data.gradeId, data.classId);
        let res = await db.summaries.findOne({
          where: {
            id: btcId,
          },
        });
        if (res) {
          console.log("Chay vao update");
          let check = {};
          try {
            check = await res.update({
              classId: data.classId,
            });
            console.log("CHECK: ", check.get({ raw: true }));
          } catch (error) {
            console.log(error);
            return {
              EM: "Something wrong with service",
              EC: 1,
              DT: "",
            };
          }
        }
      }
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

const deleteStudentService = async (id) => {
  try {
    let student = await db.students.findOne({
      where: {
        id: id,
      },
      include: {
        model: db.User,
      },
    });
    if (student) {
      let user = student.User;
      console.log(
        user.studentname +
          " " +
          user.id +
          " " +
          user.userId +
          " " +
          user.isLocked
      );
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
const getStudentByClassnameService = async (classname) => {
  let data = [];
  let checkClass = {};
  try {
    checkClass = await db.classes.findAll({
      where: {
        classname: classname,
      },
    });
    console.log(checkClass);
    if (checkClass.length === 0) {
      return {
        EM: "No class found",
        EC: 1,
        DT: "",
      };
    }
    data = await db.students.findAll({
      include: {
        model: db.classes,
        where: {
          classname: classname,
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

//lấy học sinh chưa có lớp trong năm học đang chọn 
const getAllNonClassStudentByYear = async(year) => {
  try{
    let studentsInThisYear = await sequelize.query(`select * from students where students.id not in 
    (select distinct students.id from students left join schoolreports on students.id = schoolreports.studentId left join classes 
    on classes.id = schoolreports.classId left join grades on classes.gradeId = grades.id where grades.year = :year)`, {
      replacements:{year},
      type: sequelize.QueryTypes.SELECT
    })
  return {
    EM: "success",
    EC: 0,
    DT: studentsInThisYear,
  };
  }catch(e) {
    console.log(e);
    return {
      EM: "not found",
      EC: 1,
      DT: "",
    };
  }
}

const getAllNonClassStudentByClassId = async(classId) => {
  try {
    let freeStudentsInThisYear = [];
    let classNameTemp = await db.classes.findByPk(classId);
    if(classNameTemp == null) {
      return {
        EM: "not found class",
        EC: 1,
        DT: "",
      };
    }
    let yearTemp = await db.grades.findOne({
      attributes:['year'],
      include:[
        {
          model: db.classes,
          where: {
            id: classId,
          }
        }
      ]
    });
    let year = yearTemp.dataValues.year;
    let className = classNameTemp.dataValues.classname;
    //lấy học sinh chưa có lớp 10: tức là chưa có bất kì học bạ nào đạt
    if(className.startsWith("10")) {
      freeStudentsInThisYear = await sequelize.query(`select distinct s.* from students s
      left join schoolreports sr on s.id = sr.studentId where sr.studentId is null or not exists
      (select 1 from schoolreports where studentId = s.id and concludetitle <> 'yếu') and s.statusinyear = 0`, {
        replacements:{year},
        type: sequelize.QueryTypes.SELECT
      })
    }

    //lấy học sinh chưa có lớp 10: tức là có 1 học bạ đạt
    else if(className.startsWith("11")) {
      freeStudentsInThisYear = await sequelize.query(`select distinct s.* from students s
      join schoolreports sr on s.id = sr.studentId where sr.concludetitle <> 'yếu'
      group by s.id having count(*) = 1 and s.statusinyear = 0`, {
        replacements:{year},
        type: sequelize.QueryTypes.SELECT
      })
    }

    else if(className.startsWith("12")) {
      freeStudentsInThisYear = await sequelize.query(`select distinct s.* from students s
      join schoolreports sr on s.id = sr.studentId where sr.concludetitle <> 'yếu'
      group by s.id having count(*) = 2 s.statusinyear = 0`, {
        replacements:{year},
        type: sequelize.QueryTypes.SELECT
      })
    }
    return {
      EM: "success",
      EC: 0,
      DT: freeStudentsInThisYear,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "not found",
      EC: 1,
      DT: "",
    };
  }
}

module.exports = {
  serviceCreateNewStudent,
  getAllStudentService,
  getStudentByIdService,
  updateStudentService,
  deleteStudentService,
  getStudentByClassnameService,
  getAllNonClassStudentByYear,
  getAllNonClassStudentByClassId
};
