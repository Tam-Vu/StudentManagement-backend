import gradeService from "../services/gradeService"
class GradeController {
    newYearGrade = async(req,res)=>{
        let newYear = req.body.year;
        await gradeService.createNewYearGrade(newYear)
        .then(grade => {
            res.status(200).json({ data: grade });
        })
        .catch(e => {
            console.log(e);
            res.status(500).json({message: e.message});
        }) 
    }
}
module.exports = new GradeController();