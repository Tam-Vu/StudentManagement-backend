import subjectResultSerivce from "../services/subjectResultService";

class subjectResult {
    handleInputPoint = async(req, res) => {
        let classId = req.body.classId;
        let studentId = req.body.studentId;
        let teacherComment = req.body.teacherComment;
        let fifteen_1 = req.body.fifteen_1;
        let fifteen_2 = req.body.fifteen_2;
        let fifteen_3 = req.body.fifteen_3;
        let fifteen_4 = req.body.fifteen_4;
        let fourtyFive_1 = req.body.fourtyFive_1;
        let fourtyFive_2 = req.body.fourtyFive_2;
        let subjectId = req.body.subjectId;
        let finalExam = req.body.finalExam;
        try {
            let data = await subjectResultSerivce.inputScoreService(classId, studentId,
            teacherComment, fifteen_1, fifteen_2, fifteen_3, fifteen_4,
            fourtyFive_1, fourtyFive_2, finalExam, subjectId);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        } catch(e) {
            return res.status(500).json({ message: e.message });
        }
    }

    handleFindAllTranscript = async(req, res) => {
        try {
            let studentId = req.params.id;
            let data = await subjectResultSerivce.getDetailsTranscriptByStudentId(studentId);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }
}
// getDetailsTranscriptByStudentId
module.exports = new subjectResult();