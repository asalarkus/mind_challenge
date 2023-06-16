const { response, request } = require("express");
const { logger } = require("../middlewares");

const Account = require("../models/account");

const allAccountsGet = async (req = request, res = response) => {
  try {
    const allAccounts = await Account.find()
    .populate([{path: 'operations_manager', select: ['name', 'email']}, {path:'team', select: 'name users'}]);
    console.log(allAccounts);
    if (allAccounts && allAccounts.length > 0) {
      res.status(200).json(allAccounts);
    } else {
      res.status(404).json();
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const accountGetById = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const account = await Account.findById(id)
    .populate([{path: 'operations_manager', select: ['name', 'email']}, {path:'team', select: 'name users'}]);
    res.status(200).json({
      account
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json(error);
  }
};

const createAccount = async (req, res = response) => {
  try {
    const { name, customer_name, operations_manager, team } = req.body;
    console.log(
      "🚀 ~ file: accounts.js:23 ~ createAccount ~ req.body:",
      req.body
    );

    const account = new Account({
      name,
      customer_name,
      operations_manager,
      team,
    });
    console.log(
      "🚀 ~ file: accounts.js:26 ~ createAccount ~ account:",
      account
    );

    // Save on DB
    await account.save();

    res.json({ success: true, account });
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  allAccountsGet,
  accountGetById,
  createAccount,
};
