const User = require("../models/User");

let auth = async (req, res, next) => {
  let token = req.cookies.w_auth;

  // const user = await User.findByToken(token);

  // if (!user) {
  //   return res.send({ isAuth: false, error: true });
  // }

  // req.token = token;
  // req.user = user;
  // next();

  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true,
      });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
