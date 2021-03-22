const mongoQuery = require("../util/mongoQuery");

exports.userSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  mongoQuery(async (client) => {
    const usersColl = client.db("movies").collection("users");
    const userExists = await usersColl.findOne({ email: email });
    if (userExists) {
      const message = `Email: ${email} již existuje! Zkuste se zaregistrovat znovu s jinou emailovou adresou!`;
      res.status(202).json({ message: message });
    } else {
      mongoQuery((client) => {
        const usersColl = client.db("movies").collection("users");
        usersColl.insertOne({ name: name, email: email, password: password, movies: [] });
      });
      const message = `Uživatel: ${name} s emailovou adresou: ${email} byl vytvořen!`;
      res.status(201).json({ message: message, email: email });
    }
  });
};
