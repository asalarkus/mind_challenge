const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const { logger } = require("../middlewares");

const User = require("../models/user");
const Team = require("../models/team");

const allUsersGet = async (req = request, res = response ) =>{
  try {
    const allUsers = await User.find({});
    console.log(allUsers);
    if( allUsers && allUsers.length > 0){
      res.status(200).json(allUsers);
    }else{
      res.status(404).json()  
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

const usersGet = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  try {
    const [total, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query).skip(Number(from)).limit(Number(limit)),
    ]);

    res.status(200).json({
      users
    });
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal server error");
  }
};

const usersGetById = async (req = request, res = response) => {
  const { id } = req.params;
  console.log("🚀 ~ file: users.js:43 ~ usersGetById ~ id:", id)

  try {
    const user = await User.findById(id);
    console.log("🚀 ~ file: users.js:47 ~ usersGetById ~ user:", user)
    res.json(user);
  } catch (error) {
    logger.error(error);
    res.status(500).json(error);
  }
};

const usersPost = async (req, res = response) => {
  try {
    const { name, email, password, role, english_level, tech_skills, cv_link } =
      req.body;
    console.log("🚀 ~ file: users.js:41 ~ usersPost ~ req.body:", req.body);

    //Search Default Team, and add id to new user
    try {
      const defaultTeam =  await Team.find({ name: 'Default' });
      console.log("🚀 ~ file: users.js:62 ~ usersPost ~ defaultTeam:", defaultTeam)

      const u = {
        name,
        email,
        password,
        role,
        english_level,
        tech_skills,
        cv_link,
        team: defaultTeam[0]._id
      }

      console.log("🚀 ~ file: users.js:64 ~ usersPost ~ u:", u)

      const user = new User(u);
      console.log("🚀 ~ file: users.js:28 ~ usersPost ~ user:", user);

      // Encrypt password
      const salt = bcryptjs.genSaltSync();
      user.password = bcryptjs.hashSync(password, salt);

      // Save on DB
      await user.save();

      //Add new userid to team 
      //TODO: Add Validation if exists on default team don't put over again
      const team = await Team.updateOne(
        { _id: defaultTeam[0]._id },
        { $push: {  users: user._id }},
        { new: true }
      );

      res.json({
        success: true,
        user,
        team
      }); 
    } catch (error) {
      res.status(404).send(error);
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal server error");
  }
};

const usersPut = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { _id, password, email, ...rest } = req.body;

    if( email ){
      res.status(404).json({msg: 'You are not allowed to change your email or any user email'})
    }

    if (password) {
      // Encriptar la contraseña
      const salt = bcryptjs.genSaltSync();
      rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest, {new: true});

    res.json(user);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal server error");
  }
};

const usersPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};

const usersDelete = async (req, res = response) => {
  try {
    const { id } = req.params;

    // We can deleted physically
    // const usuario = await Usuario.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate(id, { status: false });

    res.json({ user });
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  allUsersGet,
  usersGet,
  usersGetById,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
};
