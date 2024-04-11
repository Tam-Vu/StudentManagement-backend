
const createNewYearGrade = async(newYear) => {
    try {
        await db.grades.create(
            
                {
                    gradename: "10",
                    total: 0,
                    year: newYear
                }
                // {
                //     gradename: "11",
                //     total: 0,
                //     year: newYear
                // },
                // {
                //     gradename: "12",
                //     total: 0,
                //     year: newYear
                // }
            
        )
        return createNewYearGrade;
    } catch(e) {
        console.log(e);
    }
}

module.exports = {
    createNewYearGrade,
}