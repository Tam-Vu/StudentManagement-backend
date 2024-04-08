
//thêm các hàm xủ lý ở đây 
class StudentController {
    test(req, res) {
        return res.send("hello world from controller");
    }

}
module.exports = new StudentController();
