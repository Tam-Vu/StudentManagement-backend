import assignmentsService from "../services/assignmentsService";
//thêm các hàm xủ lý ở đây
class assignmentsController {
  handleCreateAssignments = async (req, res) => {
    try {
      let id = req.params.id;
      let data = await assignmentsService.createNewAssignmentService(
        req.body.dataList,
        id
      );
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
  //   handleFindAllStudent = async (req, res) => {
  //     try {
  //       const searchFilter = req.query.searchFilter || "";
  //       const gradename = req.query.gradename || "";
  //       const year = req.query.year || "";
  //       let data = await belongToClassesService.getAllStudentService(
  //         searchFilter,
  //         gradename,
  //         year
  //       );
  //       let userData = {};
  //       userData = data;
  //       res.status(200).json({
  //         EM: userData.EM,
  //         EC: userData.EC,
  //         DT: userData.DT,
  //       });
  //     } catch (e) {
  //       return res.status(500).json({ message: e.message });
  //     }
  //   };
  //   handleFindAllStudentByClassId = async (req, res) => {
  //     try {
  //       const classId = req.params.id;
  //       let data = await belongToClassesService.getAllStudentByClassIdService(
  //         classId
  //       );
  //       let userData = {};
  //       userData = data;
  //       res.status(200).json({
  //         EM: userData.EM,
  //         EC: userData.EC,
  //         DT: userData.DT,
  //       });
  //     } catch (e) {
  //       return res.status(500).json({ message: e.message });
  //     }
  //   };
  //   handleFindAllClassByStudentId = async (req, res) => {
  //     try {
  //       const studentId = req.params.id;
  //       let data = await belongToClassesService.getAllClassByStudentIdService(
  //         studentId
  //       );
  //       let userData = {};
  //       userData = data;
  //       res.status(200).json({
  //         EM: userData.EM,
  //         EC: userData.EC,
  //         DT: userData.DT,
  //       });
  //     } catch (e) {
  //       return res.status(500).json({ message: e.message });
  //     }
  //   };
}
module.exports = new assignmentsController();
