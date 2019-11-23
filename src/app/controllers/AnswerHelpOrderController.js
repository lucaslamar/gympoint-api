import * as Yup from 'yup';

import HelpOrder from '../schema/HelpOrder';
import Student from '../models/Student';

import AnswerHelpOrderEmail from '../jobs/AnswerHelpOrderEmail';
import Queue from '../../lib/Queue';

class AnswerHelpOrderController {
    async index(req, res) {
        const helpOrders = await HelpOrder.find({
            answer: null,
        });

        return res.json(helpOrders);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            answer: Yup.string()
                .strict()
                .required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { answer } = req.body;

        const helpOrder = await HelpOrder.findByIdAndUpdate(
            req.params.id,
            {
                answer,
                answer_at: new Date(),
            },
            { new: true }
        );

        const student = await Student.findByPk(helpOrder.student_id);

        await Queue.add(AnswerHelpOrderEmail.key, {
            helpOrder,
            student,
        });

        return res.json(helpOrder);
    }
}

export default new AnswerHelpOrderController();
