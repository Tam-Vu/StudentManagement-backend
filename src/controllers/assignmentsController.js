import assignmentsService from "../services/assignmentsService";
//thêm các hàm xủ lý ở đây
class assignmentsController {
  handleCreateAssignments = async (req, res) => {
    let teacherId = req.body.teacherId;
    let classId = req.body.classId;
    let subjectId = req.body.subjectId;
    try {
      let data = await assignmentsService.assignTeacherIntoClasses(teacherId, classId, subjectId);
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

  handleGetAllAssignments = async(req, res) => {
    let year = req.params.year;
    await assignmentsService.getAllAssignmentsInYear(year)
    .then((assignment) => {
      res.status(200).json({
        EM: assignment.EM,
        EC: assignment.EC,
        DT: assignment.DT,
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ message: e.message });
    });
  }

  handleDeleteTeacher = async(req, res) => {
    let subjectId = req.body.subjectId;
    let classId = req.body.classId;
    try {
      let data = await assignmentsService.deleteTeacherInAssignment(subjectId, classId);
      res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch(e) {
      console.log(e);
      res.status(500).json({ message: e.message });
    }
  }
}
module.exports = new assignmentsController();
