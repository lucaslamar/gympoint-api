import * as Yup from 'yup';

import HelpOrder from '../schema/HelpOrder';
import Subscription from '../models/Subscription';

class HelpOrderController {
    async index(req, res) {
        const { student_id } = req.params;

        const hasSubscription = await Subscription.findOne({
            where: { student_id },
        });

        if (!hasSubscription) {
            return res
                .status(401)
                .json({ error: 'You need an Subscription to list checkins' });
        }

        const helpOrders = await HelpOrder.find({
            student_id,
        }).sort({ created_at: 'desc' });

        return res.json(helpOrders);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            question: Yup.string()
                .strict()
                .required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { student_id } = req.params;

        const hasSubscription = await Subscription.findOne({
            where: { student_id },
        });

        if (!hasSubscription) {
            return res.status(401).json({
                error: 'You need an Subscription to make help orders',
            });
        }

        const { question } = req.body;

        const { id } = await HelpOrder.create({
            question,
            student_id,
        });

        return res.json({
            id,
            student_id,
            question,
        });
    }
}

export default new HelpOrderController();
