import Plan from '../models/Plan';

class PlanController {
    async index(req, res) {
        return res.json({});
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
        return res.json({});
    }

    async delete(req, res) {
        return res.json({});
    }
}

export default new PlanController();
