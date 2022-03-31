import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    priority: {
        type: Number,
        required: true,
        min: 1,
        max: 3
    },
    createdAt: {
		type: Date,
        immutable: true,
		default: () => new Date()
	}
});

const projectSchema = new mongoose.Schema({
	userId: {
		type: String,
        immutable: true,
		required: true,
	},
	name: {
		type: String,
		required: true,
        minlength: 1
	},
    toDo: {
        type: [taskSchema],
        default: [],
        required: true,
    },
    doing: {
        type: [taskSchema],
        default: [],
        required: true,
    },
    done: {
        type: [taskSchema],
        default: [],
        required: true,
    },
    createdAt: {
		type: Date,
        immutable: true,
		default: () => new Date()
	},
    updatedAt: {
        type: Date,
		default: () => new Date()
    }
});

export default mongoose.model('Project', projectSchema);