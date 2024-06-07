import teacherService from "../services/teacherService";
//thêm các hàm xủ lý ở đây
class teacherController {
  handleCreateNewTeacher = async (req, res) => {
    let image = req.file;
    try {
      let user = await teacherService.serviceCreateNewTeacher(req.body, image);
      res.status(200).json({
        EM: user.EM,
        EC: user.EC,
        DT: user.DT,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };
  handleFindAllTeacher = async (req, res) => {
    try {
      await teacherService
        .getAllTeacherService()
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
  handleFindTeacherById = async (req, res) => {
    try {
      let id = req.params.id;
      console.log("id: " + id);
      let data = await teacherService.getTeacherByIdService(id);
      let userData = {};
      userData = data;
      res.status(200).json(userData);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };
  handleUpdateTeacher = async (req, res) => {
    try {
      let id = req.params.id;
      let updatedAccount = await teacherService.updateTeacherService(
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
  handleDeleteTeacher = async (req, res) => {
    try {
      let id = req.params.id;
      let deletedAccount = await teacherService.deleteTeacherService(id);
      res.status(200).json({ message: "deleted user" });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };

  handleFindClassNonSubjectClass = async (req, res) => {
    try {
      let teacherId = req.body.teacherId;
      let year = req.body.year;
      let classes = await teacherService.getAllClassNotAssignBySubject(
        teacherId,
        year
      );
      res.status(200).json({
        EM: classes.EM,
        EC: classes.EC,
        DT: classes.DT,
      });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };

  handleFindAllteacherBySubjectId = async(req, res) => {
    let subjectId = req.params.subjectId;
    await teacherService.getAllTeacherBySubjectId(subjectId)
    .then((teacher) => {
      res.status(200).json({
        EM: teacher.EM,
        EC: teacher.EC,
        DT: teacher.DT,
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ message: e.message });
    });
  }
}
module.exports = new teacherController();
