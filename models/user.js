import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		immutable: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		immutable: true,
		default: () => new Date()
	}
});

export default mongoose.model('User', userSchema);