const Movie = require("../models/Movie");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

module.exports = {
  //lista
  async index(req, res) {
    const movies = await Movie.find().sort("-createdAt");
    return res.json(movies);
  },

  async destroy(req, res) {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(400).json({ error: "Movie does not exists" });
    }

    await movie.remove();

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
      maisTarde
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

    const movie = await Movie.create({
      nome,
      data,
      genero,
      comentarios,
      favorito,
      assistiu,
      maisTarde,
      thumbnail: newFileName
    });

    req.io.emit("movie", movie);

    return res.json(movie);
  }
};
