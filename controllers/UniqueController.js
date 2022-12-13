const { Unique } = require("../models");

const CreateUnique = async (req, res) => {
  try {
    const unique = await Unique.create(req.body);
    res.send(unique);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  CreateUnique
};
