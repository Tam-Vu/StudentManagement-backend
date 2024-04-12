import teacherService from "../services/teacherService";
//thêm các hàm xủ lý ở đây
class TeacherController {
  handleCreateNewTeacher = async (req, res) => {
    try {
      let { data } = req.body;
      let user = await teacherService.serviceCreateNewTeacher(data);
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
}
module.exports = new TeacherController();
