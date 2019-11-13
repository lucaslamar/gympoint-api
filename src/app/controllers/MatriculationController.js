import { addMonths, parseISO, isBefore } from 'date-fns';

import Matriculation from '../models/Matriculation';
import Student from '../models/Student';
import Plan from '../models/Plan';

class MatriculationController {
    async index(req, res) {
        return res.json({});
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

        const studentMatriculationExist = await Matriculation.findOne({
            where: { student_id: student.id },
        });

        if (studentMatriculationExist) {
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

        const matriculation = await Matriculation.create({
            student_id,
            plan_id,
            start_date,
            price,
            end_date,
        });

        return res.json(matriculation);
    }

    async update(req, res) {
        const { start_date } = req.body;
        const matriculation = await Matriculation.findByPk(req.params.id);

        if (!matriculation) {
            return res.status(404).json({ error: 'Matriculation not found' });
        }
        const plan = await Plan.findByPk(req.body.plan_id);

        if (!plan) {
            return res.status(404).json({ error: 'Plan does not exist' });
        }

        const price = plan.price * plan.duration;
        const end_date = addMonths(parseISO(start_date), plan.duration);

        await matriculation.update({
            price,
            end_date,
            ...req.body,
        });

        return res.json({
            matriculation,
        });
    }

    async delete(req, res) {
        const matriculation = await Matriculation.findByPk(req.params.id);

        if (!matriculation) {
            return res.status(404).json({ error: 'Matriculation not found' });
        }

        await matriculation.destroy();

        return res.json('Successfully deleted');
    }
}

export default new MatriculationController();
