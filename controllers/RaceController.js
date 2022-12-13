const { Race } = require("../models");

const CreateRace = async (req, res) => {
  try {
    const race = await Race.create(req.body);
    res.send(race);
  } catch (error) {
    throw error;
  }
};

const GetUserRaces = async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    const races = await Race.findAll({ where: { user_id: userId } });
    res.send(races);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  CreateRace,
  GetUserRaces
};
