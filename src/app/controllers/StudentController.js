import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string()
                .transform((val, original) =>
                    val
                        .toLowerCase()
                        .split(' ')
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(' ')
                )
                .required(),
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

        const student = await Student.create(req.body);
        return res.status(200).json(student);
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
    }
}

export default new StudentController();
