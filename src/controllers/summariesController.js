import summariesService from "../services/summariesService";
//thêm các hàm xủ lý ở đây
class summariesController {
  handleCreatesummaries = async (req, res) => {
    try {
      let arrayStudentId = req.body.data;
      let classId = req.params.id;
      let data = await summariesService.createSummaryService(arrayStudentId, classId);
      let userData = {};
      userData = data;
      res.status(200).json({
        EM: res.EM,
        EC: res.EC,
        DT: res.DT,
      });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };
  handleFindAllStudent = async (req, res) => {
    try {
      const searchFilter = req.query.searchFilter || "";
      const gradename = req.query.gradename || "";
      const year = req.query.year || "";
      let data = await summariesService.getAllStudentService(
        searchFilter,
        gradename,
        year
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
  handleFindAllStudentByClassId = async (req, res) => {
    try {
      const classId = req.params.id;
      let data = await summariesService.getAllStudentByClassIdService(
        classId
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
  handleFindAllClassByStudentId = async (req, res) => {
    try {
      const studentId = req.params.id;
      let data = await summariesService.getAllClassByStudentIdService(
        studentId
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

  handleShowSummariesByStudentId = async(req, res) => {
    try {
      let id = req.params.id;
      await summariesService.getDetailsTranscriptByStudentId(id)
      .then((data) => {
        res.status(200).json({
          EM: data.EM,
          EC: data.EC,
          DT: data.DT,
        });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({ message: e.message });
      });
    } catch(e) {
      return res.status(500).json({ message: e.message });
    }
  }

  handleShowBestStudentInEachGrade = async(req, res) => {
    try {
      let year = req.params.year;
      let data = await summariesService.getBestStudentInEachGrade(year);
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
module.exports = new summariesController();
