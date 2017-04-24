import jwt from 'jsonwebtoken';

export const login = (req, res) => {
	const { username, password } = req.body;
	if(
    !username ||
    !password
  ){
		res.status(400).send();
		return false;
	}
  const User = req.app.db.models.User;
  User.findOne({login: username}).exec((err, user) => {
		if(err){
			console.log(err);
			res.status(500).send();
      return false;
		}
    if(
      !user ||
      !user.checkPassword(password)
    ){
			console.log(err);
			res.status(403).send();
      return false;
    }
    else{
      const jwtToken = jwt.sign({
        _id: user._id,
        login: user.login,
        team: user.team,
        role: user.role,
        profileImg: user.profileImg
      }, process.env.JWT_SECRET);
      res.json({jwtToken});
    }
	});
}