import mongoose from 'mongoose';

export default ()  => {
	mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/project-tasks-manager', {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	});
};