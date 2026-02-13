const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        let mongodbURL = process.env.MONGOOSE_URL;

        if (!mongodbURL) {
            throw new Error("MONGOOSE_URL environment variable is not set");
        }

        // Remove trailing slash if exists
        if (mongodbURL.endsWith('/')) {
            mongodbURL = mongodbURL.slice(0, -1);
        }

        const projectName = "resume_builder";

        await mongoose.connect(`${mongodbURL}/${projectName}`);

        console.log("MongoDB connected successfully ✅");

    } catch (error) {
        console.error("Error connecting to MongoDB ❌", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
