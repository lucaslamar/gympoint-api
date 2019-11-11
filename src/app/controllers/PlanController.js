import Plan from '../models/Plan';

class PlanController {
    async index(req, res) {
        const listPlan = await Plan.findAll({
            attributes: ['title', 'duration', 'price'],
        });
        return res.json(listPlan);
    }

    async store(req, res) {
        const { title, duration, price } = req.body;

        const { id } = await Plan.create({
            title,
            duration,
            price,
        });

        return res.json({
            id,
            title,
            duration,
            price,
        });
    }

    async update(req, res) {
        const { id } = req.params;
        const plan = await Plan.findByPk(id);
        const { title, duration, price } = await plan.update(req.body);

        return res.json({
            title,
            duration,
            price,
        });
    }

    async delete(req, res) {
        const { id } = req.params;
        const plan = await Plan.findByPk(id);
        await plan.destroy(id);
        return res.status(200).json({ sucess: 'Deleted with sucess.' });
    }
}

export default new PlanController();
