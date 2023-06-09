const { response, request } = require("express");
const { logger } = require("../middlewares");

const Team = require("../models/team");
const User = require("../models/user");

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

const addUserToTeam = async ( req, res = response ) =>{
  try {
    const { teamId, userId } = req.body;
    console.log("🚀 ~ file: teams.js:58 ~ addUserToTeam ~ req.body:", req.body)

    try {
      const team = await Team.updateOne(
        { _id: teamId },
        { $push: {  users: userId} },
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

//TODO: Users can only exists on one tema
const changeUserToNewTeam = async ( req, res = response ) =>{
  try {
    const { userId, newTeamId } = req.body;
    console.log("🚀 ~ file: teams.js:58 ~ addUserToTeam ~ req.body:", req.body)
    try {
    //TODO: Search user if exists on database
    const user = await User.findById(userId);
    console.log("🚀 ~ file: teams.js:87 ~ changeUserToNewTeam ~ user:", user)
    //TODO: Remove user from actual team
      let queryRemoveOldTeam = { _id: user.team };
      console.log("🚀 ~ file: teams.js:91 ~ changeUserToNewTeam ~ queryRemoveOldTeam:", queryRemoveOldTeam)
      let userToRemove = {  users: user._id };
      console.log("🚀 ~ file: teams.js:93 ~ changeUserToNewTeam ~ userToRemove:", userToRemove)
      let queryAddNewTeam = { _id: newTeamId };
      console.log("🚀 ~ file: teams.js:94 ~ changeUserToNewTeam ~ queryAddNewTeam:", queryAddNewTeam)
      let userToAdd = {  users: user._id };
      console.log("🚀 ~ file: teams.js:96 ~ changeUserToNewTeam ~ userToAdd:", userToAdd)
      let filter = { _id: user._id };
      console.log("🚀 ~ file: teams.js:99 ~ changeUserToNewTeam ~ filter:", filter)
      let update = { team: newTeamId };
      console.log("🚀 ~ file: teams.js:101 ~ changeUserToNewTeam ~ update:", update)
      try {
        const [removeOldTeam, addToNewTeam, updateUserTeam] = await Promise.all([
          await Team.updateOne(
              queryRemoveOldTeam,
            { $pull:  userToRemove },
            { new: true }
          ),
          await Team.updateOne(
              queryAddNewTeam,
            { $push: userToAdd },
            { new: true }
          ),
          await User.findByIdAndUpdate(user._id, update)
        ]);
        res.status(200).json({ success: true,  removeOldTeam, addToNewTeam, updateUserTeam}); 
      } catch (error) {
        res.status(500).json(error)
      }

    } catch (error) {
      res.status(404).json(error);
    }
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
