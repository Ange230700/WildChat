const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const messages = await tables.Message.readAll();
    res.json(messages);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const message = await tables.Message.read(req.params.id);
    res.json(message);
  } catch (err) {
    if (err.message === `Message with ID ${req.params.id} not found`) {
      res.sendStatus(404);
    } else {
      next(err);
    }
  }
};

const edit = async (req, res, next) => {
  try {
    const message = await tables.Message.update(req.params.id, req.body);
    res.json(message);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const message = await tables.Message.create(req.body);
    res.json(message);
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.Message.delete(req.params.id);
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
