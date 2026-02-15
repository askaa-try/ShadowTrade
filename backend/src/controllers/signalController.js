const signalService = require('../services/signalService');

exports.getSignals = async (req, res) => {
  try {
    const signals = await signalService.getByStrategy(req.params.strategyId, req.user.id);
    res.json(signals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSignalById = async (req, res) => {
  try {
    const signal = await signalService.getById(req.params.id, req.user.id);
    if (!signal) {
      return res.status(404).json({ error: 'Signal not found' });
    }
    res.json(signal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifySignal = async (req, res) => {
  try {
    const isValid = await signalService.verify(req.body);
    res.json({ valid: isValid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
