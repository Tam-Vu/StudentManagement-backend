import summariesService from "../services/summariesService";
//thêm các hàm xủ lý ở đây
class summariesController {
  handleFindAllStudent = async (req, res) => {
    try {
      await summariesService
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
}
module.exports = new summariesController();
