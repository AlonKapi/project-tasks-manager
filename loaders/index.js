import expressLoader from './express.js';
import mongooseLoader from './mongoose';

export default async ({ expressApp }) => {
    await mongooseLoader();
	Logger.info('MongoDB connected');

	await expressLoader({ app: expressApp });
	console.log('Express Initialized');
};
