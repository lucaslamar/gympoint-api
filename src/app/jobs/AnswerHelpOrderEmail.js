import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class AnswerHelpOrderEmail {
    get key() {
        return 'AnswerHelpOrderEmail';
    }

    async handle({ data }) {
        const { helpOrder, student } = data;

        await Mail.sendMail({
            to: `${student.name} <${student.email}>`,
            subject: 'Pedido de ajuda - Resposta',
            template: 'answer',
            context: {
                student: student.name,
                question: helpOrder.question,
                answer: helpOrder.answer,
                date: format(
                    parseISO(helpOrder.answer_at),
                    "d 'de' MMMM 'de' yyyy",
                    {
                        locale: pt,
                    }
                ),
            },
        });
    }
}

export default new AnswerHelpOrderEmail();
