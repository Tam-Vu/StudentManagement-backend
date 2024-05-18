import tuitionsService from '../services/tuitionsService'

class TuitionsController {
    handleCreateTuitionsByClass = async(req, res) => {
      try {
          let classId = req.body.classId;
          let price = req.body.price;
          let month = req.body.month;
          let year = req.body.year;
          let closingdate = req.body.closingdate;
          await tuitionsService.createTuitionByClassId(classId, price, month, year, closingdate)
          .then((data) => {
              res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
              });
            })
            .catch((e) => {
              console.log(e);
              res.status(500).json({ message: e.message });
            });
      } 
      catch(e) {
          return res.status(500).json({ message: e.message });
      }
    }

    handleFindAllTuitionsByClass = async(req, res) => {
      try {
          await tuitionsService.getAllTuitionByClassId()
          .then((data) => {
              res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
              });
            })
            .catch((e) => {
              console.log(e);
              res.status(500).json({ message: e.message });
            });
      } catch(e) {
          res.status(500).json({ message: e.message });
      }
    }

    handlePayTuition = async(req, res) => {
      try {
          let tuitionId = req.params.id;
          let data = await tuitionsService.payTuition(tuitionId);
          res.status(200).json({
              EM: data.EM,
              EC: data.EC,
              DT: data.DT,
            });
      } catch(e) {
          res.status(500).json({ message: e.message });
      }
    }

    handleGetAllTuitionsByStudentId = async(req, res) => {
      try {
          let studentId = req.params.id;
          await tuitionsService.getAllTuitionsByStudentId(studentId)
          .then((data) => {
              res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
              });
            })
            .catch((e) => {
              console.log(e);
              res.status(500).json({ message: e.message });
            });
      } catch(e) {
          res.status(500).json({ message: e.message });
      }
    }

  handleFindAllTuitionOfStudentInYear = async(req, res) => {
    try {
      let year = req.params.year;
      await tuitionsService.getAllTuitionOfStudentInYear(year)
      .then((data) => {
          res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
          });
        })
        .catch((e) => {
          console.log(e);
          res.status(500).json({ message: e.message });
        });
    } catch(e) {
        res.status(500).json({ message: e.message });
    }
  }

  handlePayDebt = async(req, res) => {
  try {
     let tuitionId = req.params.id;
      let price = req.body.price;
      let month = req.body.month;
      let year = req.body.year;
      let closingdate = req.body.closingdate;
      let data = await tuitionsService.paySingleDebt(tuitionId, price, month, year, closingdate);
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




// payTuition,
// getAllTuitionsByStudentId,
//getAllTuitionOfStudentInYear
module.exports = new TuitionsController();