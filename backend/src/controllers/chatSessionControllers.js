const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const chatSessions = await tables.ChatSession.readAll();
    res.json(chatSessions);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const chatSession = await tables.ChatSession.read(req.params.id);
    res.json(chatSession);
  } catch (err) {
    if (err.message === `ChatSession with ID ${req.params.id} not found`) {
      res.sendStatus(404);
    } else {
      next(err);
    }
  }
};

const edit = async (req, res, next) => {
  try {
    const chatSession = await tables.ChatSession.update(
      req.params.id,
      req.body
    );
    res.json(chatSession);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const chatSession = await tables.ChatSession.create(req.body);
    res.json(chatSession);
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.ChatSession.delete(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
