//index, show, store, update, destroy
const Serie = require("../models/Serie");

module.exports = {
  async store(req, res) {
    const serie = await Serie.findById(req.params.id);

    if (!serie) {
      return res.status(400).json({ error: "Serie does not exists" });
    }

    if (serie.maisTarde == 0) {
      serie.maisTarde = 1;
    } else {
      serie.maisTarde = 0;
    }
    await serie.save();

    req.io.emit("serieFavorite", serie);

    return res.json(serie);
  }
};
