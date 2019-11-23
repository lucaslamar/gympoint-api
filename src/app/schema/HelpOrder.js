import mongoose from 'mongoose';

const HelpOrderSchema = new mongoose.Schema({
    student_id: {
        type: Number,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        default: null,
    },
    answer_at: {
        type: Date,
        default: null,
    },
});

export default mongoose.model('HelpOrders', HelpOrderSchema);
