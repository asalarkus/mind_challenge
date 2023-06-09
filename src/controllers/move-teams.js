const { response, request } = require("express");
const { logger } = require("../middlewares");

const MoveTeam = require("../models/move-team");
const Team = require("../models/team");

const allMovementsGet = async (req = request, res = response) => {
  const { search_field, search_value } = req.query;

  console.log('::queryObj:::', query);
  //res.json(query);
  try {
    const allMovements = await MoveTeam.find(query);
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

    try {
      const [fromTeamName, toTeamName] = await Promise.all([
        Team.find({_id: fromTeamId}),
        Team.find({_id: toTeamId}),
      ]);t 
  
      const movement = new MoveTeam({
          userId, 
          fromTeamId,
          fromTeamName,
          toTeamId,
          toTeamName,
          startDate: new Date(),
          endDate: endDatePlus30
      });
      console.log("🚀 ~ file: move-teams.js:46 ~ createTeam ~ movement:", movement);
  
      // Save on DB
      await movement.save();
  
      res.status(200).json({ success: true, movement });
    } catch (error) {
      res.status(404).json({msg: 'Team Name not found'}) 
    }
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
