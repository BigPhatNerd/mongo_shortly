const mongoose = require('mongoose');
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost/shortly";
const connectDB = async() =>{
	try {
		console.log({mongoUri});
		await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
	} catch(err) {
		
		console.error(err.message);
		process.exit(1);
	}
}

module.exports = connectDB;