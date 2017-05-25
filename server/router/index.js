import authenticate from './authenticate';
import path from 'path';
import registration from './register';
import resetPassword from './resetPassword';
import login from './login';
import users from './users';
import timeEntry from './timeEntry';
import reports from './reports';
import sync from './sync';
import teams from './teams';
import company from './company';
import notification from './notification';

export default function(app) {

  app.use('/api/login', login);
  app.use('/api/register', registration);
  app.use('/api/resetPassword', resetPassword);
  app.use('/api/user', authenticate, users);
  app.use('/api/timeEntry', authenticate, timeEntry);
  app.use('/api/report', authenticate, reports);
  app.use('/api/sync', authenticate, sync);
  app.use('/api/teams', authenticate, teams);
  app.use('/api/company', authenticate, company);
  app.use('/api/notification', authenticate, notification);

  app.get('/*', (req, res, next) => res.sendFile(
    path.join(__dirname,'/../../build/index.html')
  ));

}
