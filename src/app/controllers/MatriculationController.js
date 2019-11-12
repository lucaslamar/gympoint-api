import * as Yup from 'yup';
import { Op } from 'sequelize';
import Matriculation from '../models/Matriculation';
import Student from '../models/Student';
import Plan from '../models/Plan';

class MatriculationController {
    async index(req, res) {
        return res.json({});
    }

    async store(req, res) {
        const { student_id, start_date, plan_id, end_date, price } = req.body;

        const matriculation = await Matriculation.create({
            student_id,
            plan_id,
            start_date,
            end_date,
            price,
        });

        return res.json(matriculation);
    }

    async update(req, res) {
        return res.json({});
    }

    async delete(req, res) {
        return res.json({});
    }
}

export default new MatriculationController();
