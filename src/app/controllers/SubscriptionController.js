import { addMonths, parseISO, isBefore } from 'date-fns';

import Subscription from '../models/Subscription';
import Student from '../models/Student';
import Plan from '../models/Plan';

class SubscriptionController {
    async index(req, res) {
        const { page = 1 } = req.body;

        const subscriptionList = await Subscription.findAll({
            order: ['start_date'],
            limit: 15,
            offset: (page - 1) * 15,
            include: [
                {
                    model: Student,
                    as: 'student',
                    attributes: ['id', 'name', 'email'],
                },
                {
                    model: Plan,
                    as: 'plan',
                    attributes: ['id', 'title', 'duration'],
                },
            ],
        });

        return res.json(subscriptionList);
    }

    async store(req, res) {
        const { student_id, start_date, plan_id } = req.body;

        if (isBefore(parseISO(start_date), new Date())) {
            return res.status(400).json({
                error: `past dates dont permited today is ${new Date()}`,
            });
        }

        const student = await Student.findByPk(student_id);

        if (!student) {
            return res.status(404).json({ error: 'Student does not exist' });
        }

        const studentSubscriptionExist = await Subscription.findOne({
            where: { student_id: student.id },
        });

        if (studentSubscriptionExist) {
            return res
                .status(400)
                .json({ error: `${student.name} already enrolled` });
        }

        const plan = await Plan.findByPk(plan_id);

        if (!plan) {
            return res.status(404).json({ error: 'plan does not exist' });
        }

        const price = plan.price * plan.duration;
        const end_date = addMonths(parseISO(start_date), plan.duration);

        const subscription = await Subscription.create({
            student_id,
            plan_id,
            start_date,
            price,
            end_date,
        });

        return res.json(subscription);
    }

    async update(req, res) {
        const { start_date } = req.body;
        const subscription = await Subscription.findByPk(req.params.id);

        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }
        const plan = await Plan.findByPk(req.body.plan_id);

        if (!plan) {
            return res.status(404).json({ error: 'Plan does not exist' });
        }

        const price = plan.price * plan.duration;
        const end_date = addMonths(parseISO(start_date), plan.duration);

        await subscription.update({
            price,
            end_date,
            ...req.body,
        });

        return res.json({
            subscription,
        });
    }

    async delete(req, res) {
        const subscription = await Subscription.findByPk(req.params.id);

        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }

        await subscription.destroy();

        return res.json('Successfully deleted');
    }
}

export default new SubscriptionController();
