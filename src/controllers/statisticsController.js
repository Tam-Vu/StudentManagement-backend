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

    handleCompareNumOfStudentIntwoYearBytitle = async(req, res) => {
        try {
            let year = req.params.year;
            let data = await statisticsService.compareNumOfStudentInTwoYears(year);
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

    handleGetTopTenBestStudent = async(req, res) => {
        let year = req.params.year;
        await statisticsService.getTopTenBestStudents(year)
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
    }

    handleGetAllGpaOfOneStudent = async(req, res) => {
        let id = req.params.id;
        await statisticsService.compareGpaOfOneStudent(id)
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
    }

    handleGetAllStudentSortByTitle = async(req, res) => {
        try {
            let year = req.params.year;
            let data = await statisticsService.countAllStudentSortByTitle(year);
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

module.exports = new StatisticsController();