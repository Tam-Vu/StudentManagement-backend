
const createNewYearGrade = async (newYear) => {
    try {
      let data = await db.grades.bulkCreate([
        {
          gradename: "10",
          total: 0,
          year: newYear,
        },
        {
          gradename: "11",
          total: 0,
          year: newYear,
        },
        {
          gradename: "12",
          total: 0,
          year: newYear,
        },
      ]);
      return {
        EM: "success",
        EC: 0,
        DT: data,
      };
    } catch (e) {
      console.log(e);
      return {
        EM: "something wrong with service",
        EC: 1,
        DT: [],
      };
    }
  };
  
module.exports = {
    createNewYearGrade,
}