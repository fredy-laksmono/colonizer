const { Race } = require("../models");

const CreateRace = async (req, res) => {
  try {
    const race = await Race.create(req.body);
    res.send(race);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  CreateRace
};
