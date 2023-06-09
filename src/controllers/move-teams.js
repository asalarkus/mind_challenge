const { response, request } = require("express");
const { logger } = require("../middlewares");

const MoveTeam = require("../models/move-team");
const Team = require("../models/team");

const allMovementsGet = async (req = request, res = response) => {
  const { search_field, search_value } = req.query;
  //res.json(query);
  try {
    const allMovements = await MoveTeam.find({});
    console.log(allMovements);
    if (allMovements && allMovements.length > 0) {
      res.status(200).json(allMovements);
    } else {
      res.status(404).json();
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const movementGetById = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const movement = await MoveTeam.findById(id);
    res.status(200).json({
        movement
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json(error);
  }
};

const createMovementTeam = async (req, res = response) => {
  try {
    
    const { userId, fromTeamId, toTeamId } = req.body;
    console.log("🚀 ~ file: move-teams.js:38 ~ createTeam ~ req.body:", req.body)

    let endDatePlus30 = new Date(); // Now
    endDatePlus30.setDate(endDatePlus30.getDate() + 60); // Set now + 30 days as the new date

      let fromTeamIdRef = { _id: fromTeamId };
      console.log("🚀 ~ file: move-teams.js:51 ~ createMovementTeam ~ fromTeamId:", fromTeamIdRef)
      let toTeamIdRef = { _id: toTeamId };      
      console.log("🚀 ~ file: move-teams.js:54 ~ createMovementTeam ~ toTeamId:", toTeamIdRef)
      const fromTeamName = await Team.findById(fromTeamId);
      const toTeamName = await Team.findById(toTeamId);
      console.log("🚀 ~ file: move-teams.js:53 ~ createMovementTeam ~ fromTeamName:", fromTeamName.name)
      console.log("🚀 ~ file: move-teams.js:50 ~ createMovementTeam ~ toTeamName:", toTeamName.name)
  
      const movement = new MoveTeam({
          userId, 
          fromTeamId,
          fromTeamName: fromTeamName.name,
          toTeamId,
          toTeamName: toTeamName.name,
          startDate: new Date(),
          endDate: endDatePlus30
      });
      console.log("🚀 ~ file: move-teams.js:46 ~ createTeam ~ movement:", movement);
  
      // Save on DB
      await movement.save();
  
      res.status(200).json({ success: true, movement });

  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
    allMovementsGet,
    movementGetById,
    createMovementTeam
};
