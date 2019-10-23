import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            age: Yup.number().required(),
            weight: Yup.number().required(),
            height: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const userExists = await Student.findOne({
            where: { email: req.body.email },
        });

        if (userExists) {
            return res.status(400).json({ error: 'User already exists.' });
        }

        try {
            const student = await Student.create(req.body);
            return res.status(200).json(student);
        } catch (error) {
            return res.status(400).json({ error: 'Create failed.' });
        }
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            age: Yup.number().required(),
            weight: Yup.number().required(),
            height: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' });
        }

        const { id } = req.params;

        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(400).json({ error: 'Student not found.' });
        }

        try {
            const { name, email, age, weight, height } = await student.update(
                req.body
            );

            return res.json({
                name,
                email,
                age,
                weight,
                height,
            });
        } catch (error) {
            return res.json(400).json({ erro: 'Update failed.' });
        }
    }
}

export default new StudentController();
