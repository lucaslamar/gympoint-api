import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class SubscriptionEmail {
    get key() {
        return 'SubscriptionEmail';
    }

    async handle({ data }) {
        const { subscription, student, plan } = data;

        console.log('a fila anda');

        await Mail.sendMail({
            to: `${student.name} <${student.email}>`,
            subject: 'Nova matrícula',
            template: 'subscription',
            context: {
                student: student.name,
                plan: plan.title,
                planPrice: Number(plan.price).toFixed(2),
                startDate: format(
                    parseISO(subscription.start_date),
                    "d 'de' MMMM 'de' yyyy",
                    {
                        locale: pt,
                    }
                ),
                endDate: format(
                    parseISO(subscription.end_date),
                    "d 'de' MMMM 'de' yyyy",
                    { locale: pt }
                ),
                totalPrice: Number(subscription.price).toFixed(2),
            },
        });
    }
}

export default new SubscriptionEmail();
