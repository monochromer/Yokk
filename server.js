const app = require('./index');

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), () => console.log(`App is listening on port ${app.get('port')}`));