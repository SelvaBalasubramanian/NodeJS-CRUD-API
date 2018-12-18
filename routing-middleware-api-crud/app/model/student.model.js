
module.exports = {

	student : function(sequelize,Sequelize){
		const student = sequelize.define('studentdetails',{
			name : Sequelize.STRING,
			dob : Sequelize.DATE,
			age : Sequelize.INTEGER,
			gender : Sequelize.ENUM('male','female'),
			mark1 : Sequelize.DECIMAL,
			mark2 : Sequelize.DECIMAL,
			mark3 : Sequelize.DECIMAL,
			avg : Sequelize.FLOAT,
			result : Sequelize.BOOLEAN,
			password : Sequelize.STRING,
		}
	)
	return student;
	}
};