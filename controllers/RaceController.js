const { Race } = require("../models");

const CreateRace = async (req, res) => {
  try {
    const race = await Race.create(req.body);
    res.send(race);
  } catch (error) {
    res.send({ message: `${error}` });
  }
};

const GetUserRaces = async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    const races = await Race.findAll({ where: { owner_id: userId } });
    res.send(races);
  } catch (error) {
    res.send({ message: `${error}` });
  }
};

const GetRace = async (req, res) => {
  try {
    let raceId = parseInt(req.params.id);
    const race = await Race.findByPk(raceId);
    res.send(race);
  } catch (error) {
    res.send({ message: `${error}` });
  }
};

const DeleteRace = async (req, res) => {
  try {
    let raceId = parseInt(req.params.id);
    const token = req.headers["authorization"].split(" ")[1];
    try {
      let payload = jwt.verify(token, APP_SECRET);
      await Review.destroy({
        where: { id: raceId, owner_id: payload.id }
      });
      res.send({ message: `Deleted race with ID of ${raceId}` });
    } catch (error) {
      res.send({ message: `${error}` });
    }
  } catch (error) {
    res.send({ message: `${error}` });
  }
};

const UpdateRace = async (req, res) => {
  try {
    let raceId = parseInt(req.params.id);
    const token = req.headers["authorization"].split(" ")[1];
    try {
      let payload = jwt.verify(token, APP_SECRET);
      let updatedRace = await Race.update(req.body, {
        where: { id: raceId, owner_id: payload.id },
        returning: true
      });
      res.send(updatedRace);
    } catch (error) {
      res.send({ message: `${error}` });
    }
  } catch (error) {
    res.send({ message: `${error}` });
  }
};

module.exports = {
  CreateRace,
  GetUserRaces,
  DeleteRace,
  UpdateRace,
  GetRace
};
