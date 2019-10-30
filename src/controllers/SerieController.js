const Serie = require("../models/Serie");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

module.exports = {
  //lista
  async index(req, res) {
    const series = await Serie.find().sort("-createdAt");
    return res.json(series);
  },

  async destroy(req, res) {
    const serie = await Serie.findById(req.params.id);

    if (!serie) {
      return res.status(400).json({ error: "Serie does not exists" });
    }

    await serie.remove();

    return res.json({ ok: true });
  },

  //grava
  async store(req, res) {
    const {
      nome,
      data,
      genero,
      comentarios,
      favorito,
      assistiu,
      maisTarde,
      episodio,
      temporada
    } = req.body;

    var newFileName = "";
    if (req.file) {
      const { filename } = req.file;
      const [name] = filename.split(".");
      newFileName = `${name}.jpg`;

      await sharp(req.file.path)
        .resize(500)
        .jpeg({ quality: 70 })
        .toFile(path.resolve(req.file.destination, "resized", newFileName));

      fs.unlinkSync(req.file.path);
    }

    const serie = await Serie.create({
      nome,
      data,
      genero,
      comentarios,
      favorito,
      assistiu,
      maisTarde,
      episodio,
      temporada,
      thumbnail: newFileName
    });

    req.io.emit("serie", serie);

    return res.json(serie);
  }
};
