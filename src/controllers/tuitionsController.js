import tuitionsService from '../services/tuitionsService'

class TuitionsController {
    handleCreateTuitionsByClass = async(req, res) => {
        try {
            let classId = req.body.classId;
            let price = req.body.price;
            let month = req.body.month;
            let year = req.body.year;
            let closingdate = req.body.closingdate;
            await tuitionsService.createTuitionByClassId(classId, price, month, year, closingdate);

        } catch(e) {
            return res.status(500).json({ message: e.message });
        }
    }
}

module.exports = new TuitionsController();