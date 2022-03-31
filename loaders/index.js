import expressLoader from './express.js';
import mongooseLoader from './mongoose.js';

export default async ({ expressApp }) => {
    mongooseLoader();
	console.log('MongoDB connected');

	await expressLoader({ app: expressApp });
	console.log('Express Initialized');
};
