import classService from "../services/classService";
class ClassController {
  handleCreateNewClass = async (req, res) => {
    let classname = req.body.classname;
    let total = req.body.total;
    let homeroomTeacher = req.body.homeroomTeacher;
    let gradeId = req.body.gradeId;
    await classService
      .createNewClassService(classname, total, homeroomTeacher, gradeId)
      .then((result) => {
        res.status(200).json({
          EM: result.EM,
          EC: result.EC,
          DT: result.DT,
        });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({ message: e.message });
      });
  };

  handleGetAllClasses = async (req, res) => {
    await classService
      .getAllClassService()
      .then((classes) => {
        res.status(200).json({
          EM: classes.EM,
          ED: classes.ED,
          DT: classes.DT,
        });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({ message: e.message });
      });
  };
  handleGetAllClassesByGrade = async (req, res) => {
    let gradename = req.params.gradename;
    let year = req.params.year || "";
    console.log("gradename: " + gradename);
    await classService
      .getAllClassByGradeService(gradename, year)
      .then((classes) => {
        res.status(200).json({
          EM: classes.EM,
          ED: classes.ED,
          DT: classes.DT,
        });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({ message: e.message });
      });
  };
}
module.exports = new ClassController();
