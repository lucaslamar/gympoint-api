import { isWithinInterval, subDays } from 'date-fns';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';
import Subscription from '../models/Subscription';

class CheckinController {
  async store(req, res) {
    const student_id = req.params.id;

    const subscription = await Subscription.findOne({
      where: {
        student_id
      }
    });
     ​
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
​
    const subscritprionInterval = {
      start: subscription.start_date,
      end: subscription.end_date
    };
​
    if (!isWithinInterval(new Date(), subscritprionInterval)) {
      return res.status(404).json({ error: 'Subscription not active.' });
    }
​
    const sevenDaysAgo = subDays(new Date(), 7);
​
    const checkins = await Checkin.findAndCountAll({
      where: {
        student_id,
        created_at: {
          [Op.gte]: sevenDaysAgo
        }
      }
    });
​
    if (checkins.count > 5) {
      return res.status(401).json({
        error: 'You have more than 5 checkins this week.',
        checkins: checkins.rows
      });
    }
​
    const checkin = await Checkin.create({
      student_id
    });
​
    return res.json(checkin);
  }
​
  async index(req, res) {
    const student_id = req.params.id;
​
    const checkinList = await Checkin.findAll({
      where: {
        student_id
      }
    });
​
    return res.json(checkinList);
  }
}
​
export default new CheckinController();
