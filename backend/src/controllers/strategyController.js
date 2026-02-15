const strategyService = require('../services/strategyService');

exports.getAllStrategies = async (req, res) => {
  try {
    const strategies = await strategyService.getAll(req.query);
    res.json(strategies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStrategyById = async (req, res) => {
  try {
    const strategy = await strategyService.getById(req.params.id);
    if (!strategy) {
      return res.status(404).json({ error: 'Strategy not found' });
    }
    res.json(strategy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPerformance = async (req, res) => {
  try {
    const performance = await strategyService.getPerformance(req.params.id);
    res.json(performance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createStrategy = async (req, res) => {
  try {
    const strategy = await strategyService.create(req.user.id, req.body);
    res.status(201).json(strategy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateStrategy = async (req, res) => {
  try {
    const strategy = await strategyService.update(req.params.id, req.user.id, req.body);
    res.json(strategy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteStrategy = async (req, res) => {
  try {
    await strategyService.delete(req.params.id, req.user.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
