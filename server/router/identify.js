import jwt from 'jsonwebtoken';

export default function identify(req, res, next){
	const authorizationHeader = req.headers['authorization'];
	let token;
	
	if(authorizationHeader){
		token = authorizationHeader.split(' ')[1];
	}
	
	if(!token){
    req.user = {};
    next();
    return false;
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if(err){
      req.user = {};
      next();
      return false;
    }
    const User = req.app.db.models.User;
    User.findOne({_id: decoded._id}).exec((err, user) => {
      if(err){
        console.log(err);
        req.user = {};
        next();
        return false;
      }
      req.user = user;
      next();
    });
  })
}