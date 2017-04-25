import authenticate from './authenticate';
import path from 'path';
import registration from './register';
import login from './login';
import users from './users';
import timeEntry from './timeEntry';
import reports from './reports';
import sync from './sync';
import teams from './teams';

export default function(app) {

  app.use('/api/login', login);
  app.use('/api/register', registration);
  app.use('/api/user', users);
  app.use('/api/timeEntry', authenticate, timeEntry);
  app.use('/api/report', authenticate, reports);
  app.use('/api/sync', authenticate, sync);
  app.use('/api/teams', teams);
  
  app.get('/*', (req, res, next) => res.sendFile(path.join(__dirname,'/../../build/index.html')));

}
