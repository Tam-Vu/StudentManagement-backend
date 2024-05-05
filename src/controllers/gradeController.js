import gradeService from "../services/gradeService";
class GradeController {
  newYearGrade = async (req, res) => {
    let newYear = req.body.year;
    await gradeService
      .createNewYearGrade(newYear)
      .then((grade) => {
        res.status(200).json({
          EM: grade.EM,
          EC: grade.EC,
          DT: grade.DT,
        });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({ message: e.message });
      });
  };

  findGradeByYear = async (req, res) => {
    let year = req.params.year;
    console.log(year);
    await gradeService
      .findAllGradesByYear(year)
      .then((grade) => {
        res.status(200).json({
          EM: grade.EM,
          EC: grade.EC,
          DT: grade.DT,
        });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({ message: e.message });
      });
  };
  findAllYear = async (req, res) => {
    await gradeService
      .findAllYear()
      .then((grade) => {
        res.status(200).json({
          EM: grade.EM,
          EC: grade.EC,
          DT: grade.DT,
        });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({ message: e.message });
      });
  };
}
module.exports = new GradeController();
