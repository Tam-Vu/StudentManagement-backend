import subjectService from "../services/subjectService";

class SubjectController {
    handleCreateSubject = async(req, res) => {
        try {
            let subjectName = req.body.subjectName;
            let fifteenMinFactor = req.body.fifteenMinFactor;
            let fourtyFiveMinFactor = req.body.fourtyFiveMinFactor;
            let finalFactor = req.body.finalFactor;
            let factor = req.body.factor;
            let minPassScore = req.body.minPassScore;
            let subject = await subjectService.createSubject(subjectName, fifteenMinFactor, fourtyFiveMinFactor, finalFactor, factor, minPassScore);
            res.status(200).json({
                EM: subject.EM,
                EC: subject.EC,
                DT: subject.DT,
              });
        } catch(e) {
            return res.status(500).json({ message: e.message });
        }
    }

    handleFindAllSubjects = async(req, res) => {
        try {
            await subjectService.getAllSubject()
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
        } catch(e) {
            return res.status(500).json({ message: e.message });
        }
    }

    handleDetailSubject = async(req, res) => {
        try {
            let id = req.params.id;
            let subject = await subjectService.findSubjectById(id);
            res.status(200).json({
                EM: subject.EM,
                EC: subject.EC,
                DT: subject.DT,
              });
        } catch(e) {
            return res.status(500).json({ message: e.message });
        }
    }

    handleUpdateSubject = async(req, res) => {
        try {
            let id = req.params.id;
            let subjectName = req.body.subjectName;
            let fifteenMinFactor = req.body.fifteenMinFactor;
            let fourtyFiveMinFactor = req.body.fourtyFiveMinFactor;
            let finalFactor = req.body.finalFactor;
            let factor = req.body.factor;
            let updatedSubject = await subjectService.updateSubject(id ,subjectName, fifteenMinFactor, fourtyFiveMinFactor, finalFactor, factor);
            res.status(200).json({
                EM: updatedSubject.EM,
                EC: updatedSubject.EC,
                DT: updatedSubject.DT,
              });
        } catch(e) {
            return res.status(500).json({ message: e.message });
        }
    }

    handleDeleteSubject = async(req, res) => {
        try {
            let id = req.params.id;
            let subject = await subjectService.deleteSubject(id);
            res.status(200).json({
                EM: subject.EM,
                EC: subject.EC,
                DT: subject.DT,
              });
        } catch(e) {
            return res.status(500).json({ message: e.message });
        }
    }
}
module.exports = new SubjectController();