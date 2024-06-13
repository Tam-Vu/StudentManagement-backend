import paramService from '../services/paramService'
class ParamController {
    handleUpdateParamController = async(req, res) => {
        try {
            let data = await paramService.updateParamService(req.body);
            res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            });
        } catch(e) {
            return res.status(500).json({ message: e.message });
        }
    }

    handleGetAllParam = async(req, res) => {
        try {
            let data = await paramService.getAllParams();
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
module.exports = new ParamController();