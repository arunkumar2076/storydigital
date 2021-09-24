const mongoose = require('mongoose')

const mongoUrl  = process.env.MONGO_DB_URL
const mongoDbName = process.env.MONGO_DB_NAME
console.log(mongoUrl);
console.log(mongoDbName);
const url = mongoUrl + mongoDbName

console.log("Connecting mongo db at"  , url);
/**
 * connection with mongo database
 * @param {*} result 
 */
const dbConnection = result => {
	mongoose
		.connect(url, 
			{useNewUrlParser: true , 
			useUnifiedTopology: true })
		.then(() => {
			result();
		})
		.catch(err => {
			console.log(err);
			result(err);
		});
	mongoose.Promise = global.Promise;
};

module.exports = dbConnection