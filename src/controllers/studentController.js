import studentService from "../services/studentService";
//thêm các hàm xủ lý ở đây
class StudentController {
  handleCreateNewStudent = async (req, res) => {
    console.log(req.body);
    try {
      let studentname = req.body.studentname;
      let birthDate = req.body.birthDate;
      let startDate = req.body.startDate;
      let gender = req.body.gender;
      let address = req.body.address;
      let email = req.body.email;
      let user = await studentService.serviceCreateNewStudent(req.file, studentname, birthDate, startDate, gender, address, email);
      res.status(200).json({
        EM: user.EM,
        EC: user.EC,
        DT: user.DT,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };
  handleFindAllStudent = async (req, res) => {
    console.log(req.user);
    try {
      await studentService
        .getAllStudentService()
        .then((data) => {
          res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
          });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ message: err.message });
        });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };
  handleFindStudentById = async (req, res) => {
    try {
      let id = req.params.id;
      console.log("id: " + typeof id);
      let data = await studentService.getStudentByIdService(id);
      let userData = {};
      userData = data;
      res.status(200).json(userData);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };
  handleUpdateStudent = async (req, res) => {
    try {
      let id = req.params.id;
      let belongtoclassId = req.params.btcId;
      let updatedAccount = await studentService.updateStudentService(
        req.body,
        id,
        belongtoclassId
      );
      res.status(200).json({
        EM: updatedAccount.EM,
        EC: updatedAccount.EC,
      });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };
  handleDeleteStudent = async (req, res) => {
    try {
      let id = req.params.id;
      let deletedAccount = await studentService.deleteStudentService(id);
      res.status(200).json({ message: "deleted user" });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };
  handleFindStudentByClassname = async (req, res) => {
    try {
      let classname = req.query.classname;
      let data = await studentService.getStudentByClassnameService(classname);
      let userData = {};
      userData = data;
      res.status(200).json({
        EM: userData.EM,
        EC: userData.EC,
        DT: userData.DT,
      });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };

  handleFindNonClassStudent = async (req, res) => {
    try {
      let year = req.params.year;
      console.log(year);
      let data = await studentService.getAllNonClassStudentByYear(year);
      let studentData = {};
      studentData = data;
      res.status(200).json({
        EM: studentData.EM,
        EC: studentData.EC,
        DT: studentData.DT,
      });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };

  handleFindAllNonClassStudentByClassId = async (req, res) => {
    try {
      let classId = req.params.id;
      let year = req.params.year;
      console.log(classId);
      await studentService
        .getAllNonClassStudentByClassId(classId)
        .then((data) => {
          res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
          });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ message: err.message });
        });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };

  handleFindAllStudentInYear = async(req, res) => {
    let year = req.params.year;
    try {
      let data = await studentService.getAllStudentByYear(year);
      res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch(e) {
      return res.status(500).json({ message: e.message });
    }
  }
}
module.exports = new StudentController();
