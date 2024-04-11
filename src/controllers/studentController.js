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
      let user = await studentService.serviceCreateNewStudent(
        studentname,
        birthDate,
        startDate,
        gender,
        address,
        classId,
        parentId,
        tuitionId
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
      let userList = await accountService
        .getAllUserService()
        .then((user) => {
          res.status(200).json({ user });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ message: err.message });
        });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };
}
module.exports = new StudentController();
