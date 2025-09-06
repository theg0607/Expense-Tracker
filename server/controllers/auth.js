const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.signup = async (req, res) => {
  const { password } = req.body;
  const salt = await bcrypt.genSalt(11);
  const hashedPassword = await bcrypt.hash(password, salt);
  const userToBeAdded = new User({ ...req.body, password: hashedPassword });
  const user = await userToBeAdded.save();
  const token = jwt.sign(
    { userId: user._id, verified: user.verified },
    process.env.SECRET,
    {
      expiresIn: "1h",
    }
  );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: "princerajput2363@gmail.com",
    to: user.email,
    subject: "token for verification",
    html: `<a href="http://localhost:8000/auth/verify/${token}">click here for verification</a>`, // HTML body
  });

  res.send("signup done check your email");
};

exports.signin = async (req, res) => {
  try {
    console.log(req.body);

    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
      if (user.verified) {
        const verify = await bcrypt.compare(password, user.password);
        if (verify) {
          const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
            expiresIn: "1h",
          });
          res.send({ token, msg: "DONE!" });
        } else {
          res.status(401).send("Wrong Password!");
        }
      }else{
        res.status(404).send("User is not verified")
      }
    } else {
      res.status(404).send("User does not exist");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.verify = async (req, res) => {
  console.log("verify chal rha hai");

  try {
    const decodedUser = jwt.decode(req.params.token, process.env.SECRET);
    console.log(decodedUser);

    await User.findByIdAndUpdate(decodedUser.userId, {
      verified: true,
    });
    res.send("Verified, go back to signin page");
  } catch (error) {
    console.log(error);
  }
};

exports.changePassword = async (req, res) => {
  console.log("change password triggered");

  try {
    const { email, newpassword } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).send("Invalid email");
    }

    console.log(user);

    const salt = await bcrypt.genSalt(11);
    const setPassword = await bcrypt.hash(newpassword, salt);
    await User.findByIdAndUpdate(user._id, {
      password: setPassword,
    });
    res.send("Password Updated");
  } catch (error) {
    console.log(error);
  }
};
