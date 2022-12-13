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
    const races = await Race.findAll({ where: { owner_id: userId } });
    res.send(races);
  } catch (error) {
    throw error;
  }
};

const DeleteRace = async (req, res) => {
  try {
    let raceId = parseInt(req.params.id);
    await Race.destroy({ where: { id: raceId } });
    res.send({ message: `Deleted race with ID of ${raceId}` });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  CreateRace,
  GetUserRaces,
  DeleteRace
};
