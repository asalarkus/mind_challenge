const { response, request } = require("express");
const { logger } = require("../middlewares");

const Team = require("../models/team");
const MoveTeam = require("../models/move-team");
const User = require("../models/user");

const allTeamsGet = async (req = request, res = response) => {
  try {
    const allTeams = await Team.find()
    .populate([{path: 'users', select: ['name', 'email']}]);
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
    const team = await Team.findById(id)
    .populate([{path: 'users', select: ['name', 'email']}]);
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

const addUserToTeam = async ( req, res = response ) =>{
  try {
    const { teamId, userId } = req.body;
    console.log("🚀 ~ file: teams.js:58 ~ addUserToTeam ~ req.body:", req.body)

    try {
      const team = await Team.updateOne(
        { _id: teamId },
        { $push: {  users: userId } },
        { new: true }
      );
      console.log("🚀 ~ file: teams.js:65 ~ addUserToTeam ~ team:", team)
  
      res.status(200).json({ success: true,  team}); 
    } catch (error) {
      res.status(404).json(error);
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal server error");
  }
}

const changeUserToNewTeam = async ( req, res = response ) => {
    const { userId, newTeamId } = req.body;
    const user = await User.findById(userId);
    let queryRemoveOldTeam = { _id: user.team };
    let userToRemove = {  users: user._id };
    let queryAddNewTeam = { _id: newTeamId };
    let userToAdd = {  users: user._id };
    let update = { team: newTeamId };
    const fromTeamName = await Team.findById(user.team);
    const toTeamName = await Team.findById(newTeamId);
    let endDatePlus30 = new Date(); // Now
    endDatePlus30.setDate(endDatePlus30.getDate() + 60); // Set now + 30 days as the new date

    const movement = new MoveTeam({
        userId, 
        fromTeamId: user.team,
        fromTeamName: fromTeamName.name,
        toTeamId: newTeamId,
        toTeamName: toTeamName.name,
        startDate: new Date(),
        endDate: endDatePlus30
    });

    try {
      let [removeOldTeam, addToNewTeam, updateUserTeam] = await Promise.all([
        Team.updateOne( queryRemoveOldTeam, { $pull:  userToRemove }, { new: true } ),
        Team.updateOne( queryAddNewTeam, { $push: userToAdd }, { new: true } ),
        User.findByIdAndUpdate(user._id, update),
        movement.save()
      ]);

      return res.status(200).json({ success: true,  removeOldTeam, addToNewTeam, updateUserTeam}); 
    } catch (error) {
      logger.error(error);
      res.status(500).send("Internal server error");
    }
}

const findTeamByName = async (req, res = response)=>{
  const { name } = req.params;
  console.log("🚀 ~ file: teams.js:116 ~ findTeamByName ~ name:", name)
  try {
    const team = await Team.find({ name: name });
    res.json(team);
  } catch (error) {
    console.log(error);
  }
} 

module.exports = {
    allTeamsGet,
    teamGetById,
    createTeam,
    addUserToTeam,
    changeUserToNewTeam,
    findTeamByName
};
