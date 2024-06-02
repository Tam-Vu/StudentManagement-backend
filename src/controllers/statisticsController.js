import statisticsService from '../services/statisticsService';

class StatisticsController {
    handleGetBestStudentsByYear = async(req, res) => {
        try {
            let year = req.params.year;
            let data = await statisticsService.getBestStudentInEachGrade(year);
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

    handleCountExcellentStudentsByYear = async(req, res) => {
        try {
            let year = req.params.year;
            let data = await statisticsService.getExcellentStudentInEachGrade(year);
            res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
              });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: e.message });
        }
    }
}

module.exports = new StatisticsController();