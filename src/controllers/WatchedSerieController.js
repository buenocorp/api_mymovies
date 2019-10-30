//index, show, store, update, destroy
const Serie = require("../models/Serie");

module.exports = {
  async store(req, res) {
    const serie = await Serie.findById(req.params.id);

    if (!serie) {
      return res.status(400).json({ error: "Serie does not exists" });
    }

    if (serie.assistiu == 0) {
      serie.assistiu = 1;
    } else {
      serie.assistiu = 0;
    }
    await serie.save();

    req.io.emit("serieWatched", serie);

    return res.json(serie);
  }
};
