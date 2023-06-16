const { response, request } = require("express");
const { logger } = require("../middlewares");
const addHours = require("date-fns/addHours");

const MoveTeam = require("../models/move-team");
const Team = require("../models/team");

const convertArrayToJson = async (query)=>{
  const filter = {};
  for (let i = 0; i < query.search_field.length; i++) {
    if(query.search_field[i] === 'startDate' ||  query.search_field[i] === 'endDate'){
      let gte = new Date(query.search_value[i]);
      let lt = new Date(query.search_value[i]);
      let newLt = addHours(lt, 23);
      filter[query.search_field[i]] = { $gte: gte, $lt: newLt };
    }else{
      filter[query.search_field[i]] = query.search_value[i];
    }
  }
  return filter;
}

const allMovementsGet = async (req = request, res = response) => {
  console.log(typeof req.query);

  const { search_field, search_value } = req.query;

  let allMovements = '';
  let filters = {};
  //res.json(query);
  try {
    if(typeof req.query === "object" ){
      console.log("Inside if")
      if(Array.isArray(search_field)){
        filters = await convertArrayToJson(req.query);
      }
      allMovements = await MoveTeam.find(filters)
      .populate([{path: 'userId', select: ['name', 'email']}, {path:'fromTeamId', select: 'name users'}, {path: 'toTeamId', select: ['name', 'users']}]);
      console.log("🚀 ~ file: move-teams.js:18 ~ allMovementsGet ~ allMovements:", allMovements)
    }else{
      allMovements = await MoveTeam.find().populate([{path: 'userId', select: ['name', 'email']}, {path:'fromTeamId', select: ['name', 'users']}, {path: 'toTeamId', select: ['name', 'users']}]);
    }
    
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
