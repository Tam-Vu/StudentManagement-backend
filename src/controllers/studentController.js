import studentService from "../services/studentService";
//thêm các hàm xủ lý ở đây
class StudentController {
  handleCreateNewStudent = async (req, res) => {
    try {
      let studentname = req.body.studentname;
      let birthDate = req.body.birthDate;
      let startDate = req.body.startDate;
      let gender = req.body.gender;
      let address = req.body.address;
      let classId = req.body.classId;
      let parentId = req.body.parentId;
      let tuitionId = req.body.tuitionId;
      let userId = req.body.userId;
      let user = await studentService.serviceCreateNewStudent(
        studentname,
        birthDate,
        startDate,
        gender,
        address,
        classId,
        parentId,
        tuitionId,
        userId
      );
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
      console.log("id: " + id);
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
      let updatedAccount = await studentService.updateStudentService(
        req.body,
        id
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
}
module.exports = new StudentController();
