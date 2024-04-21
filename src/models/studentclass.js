// const {Sequelize} = require('sequelize');

// const sequelize = new Sequelize("studentmanagement", "root", "12345", {
//     host: "localhost",
//     dialect: "mysql",
// });

// const studentClass = sequelize.define('studentClass',{
//     studentId: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     classId: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     }
// });
// studentClass.sync()
// .then((data)=>console.log("table sync successfully"))
// .catch(err => console.error("there is an error: ", err));