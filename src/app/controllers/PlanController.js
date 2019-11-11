import * as Yup from 'yup';

import Plan from '../models/Plan';

class PlanController {
    async index(req, res) {
        try {
            const listPlan = await Plan.findAll({
                order: ['duration'],
                attributes: ['id', 'title', 'duration', 'price'],
            });
            return res.json(listPlan);
        } catch (error) {
            return res.status(400).json({ error: 'Search failed.' });
        }
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            duration: Yup.number().required(),
            price: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' });
        }

        const PlanExist = await Plan.findOne({
            where: { title: req.body.title },
        });

        if (PlanExist) {
            return res.status(400).json({ error: 'Plan already exists.' });
        }
        try {
            const { title, duration, price } = req.body;

            const { id } = await Plan.create({
                title,
                duration,
                price,
            });

            return res.status(200).json({
                id,
                title,
                duration,
                price,
            });
        } catch (error) {
            return res.status(400).json({ error: 'Create failed.' });
        }
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string(),
            duration: Yup.number(),
            price: Yup.number(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' });
        }

        const { id } = req.params;

        const plan = await Plan.findByPk(id);

        if (!plan) {
            return res.status(400).json({ error: 'Plan not found.' });
        }

        try {
            const { title, duration, price } = await plan.update(req.body);

            return res.status(200).json({
                title,
                duration,
                price,
            });
        } catch (error) {
            return res.status(400).json({ error: 'Create failed.' });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        const plan = await Plan.findByPk(id);

        if (!plan) {
            return res.status(400).json({ error: 'Plan not found.' });
        }

        try {
            await plan.destroy(id);
            return res.status(200).json({ sucess: 'Deleted with sucess.' });
        } catch (error) {
            return res.status(400).json({ erro: 'Delete failed.' });
        }
    }
}

export default new PlanController();
