import summariesService from "../services/summariesService";
//thêm các hàm xủ lý ở đây
class summariesController {
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
}
module.exports = new summariesController();
