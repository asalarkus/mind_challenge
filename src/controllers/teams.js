const { response, request } = require("express");
const { logger } = require("../middlewares");

const Team = require("../models/team");

const allTeamsGet = async (req = request, res = response) => {
  try {
    const allTeams = await Team.find({});
    console.log(allTeams);
    if (allTeams && allTeams.length > 0) {
      res.status(200).json(allTeams);
    } else {
      res.status(404).json();
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const teamGetById = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const team = await Team.findById(id);
    res.status(200).json({
      team
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json(error);
  }
};

const createTeam = async (req, res = response) => {
  try {
    const { name, users } = req.body;
    console.log("🚀 ~ file: team.js:37 ~ createTeam ~ req.body;:", req.body)

    const team = new Team({
      name,
      users
    });
    console.log("🚀 ~ file: team.js:43 ~ createTeam ~ team:", team);

    // Save on DB
    await team.save();

    res.json({ success: true, team });
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
    allTeamsGet,
    teamGetById,
    createTeam
};
