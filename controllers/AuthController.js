const { User } = require("../models");
const middleware = require("../middleware");

const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      raw: true
    });
    if (
      user &&
      (await middleware.comparePassword(user.passwordDigest, req.body.password))
    ) {
      let payload = {
        id: user.id,
        email: user.email,
        name: user.name
      };
      let token = middleware.createToken(payload);
      return res.send({ user: payload, token });
    }
    res.status(401).send({ status: "Error", msg: "Unauthorized Request." });
  } catch (error) {
    throw error;
  }
};

const Register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    let emailInUse = await User.findOne({ where: { email: email } });
    if (emailInUse) {
      res.status(403).send({ status: "Error", msg: "Email already in use." });
    } else {
      let passwordDigest = await middleware.hashPassword(password);
      const user = await User.create({
        email,
        passwordDigest,
        name
      });
      res.send(user);
    }
  } catch (error) {
    throw error;
  }
};

const UpdatePassword = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email }
    });
    if (
      user &&
      (await middleware.comparePassword(
        user.dataValues.passwordDigest,
        req.body.oldPassword
      ))
    ) {
      let passwordDigest = await middleware.hashPassword(req.body.newPassword);
      await user.update({ passwordDigest });
      return res.send({ status: "Success", msg: "Password updated!" });
    }
    res.status(401).send({ status: "Error", msg: "Unauthorized request." });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  Login,
  Register,
  UpdatePassword
};
