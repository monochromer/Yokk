import jwt from 'jsonwebtoken';

export default function authenticate(req, res, next){
	const authorizationHeader = req.headers['authorization'];
	let token;
	
	if(authorizationHeader){
		token = authorizationHeader.split(' ')[1];
	}
	
	if(!token){
		res.status(401).send();
    return false;
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if(err){
      res.status(401).send();
      return false;
    }
    const User = req.app.db.models.User;
    User.findOne({login: decoded.login}).exec((err, user) => {
      if(err){
        console.log(err);
        res.status(500).send('Ошибка сервера');
        return false;
      }
      req.user = user;
      next();
    });
  })
}