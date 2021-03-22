const mongoQuery = require("../util/mongoQuery");

exports.userSignin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  mongoQuery(async (client) => {
    const usersColl = client.db("movies").collection("users");
    const user = await usersColl.findOne({ email: email });
    if (!user) {
      res.status(202).json({ message: "Wrong email address!" });
    } else {
      // res.status(200).json({ message: "Yeap, this email address is in our DB!", _id: user._id });
      if (user.password === password) {
        res.status(200).json({ message: "Everything correct!", user: user.name, id: user._id });
      } else {
        res.status(202).json({ message: "Wrong password!" });
      }
    }
  });
};
