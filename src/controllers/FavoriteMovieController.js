//index, show, store, update, destroy
const Movie = require("../models/Movie");

module.exports = {
  async store(req, res) {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(400).json({ error: "Movie does not exists" });
    }

    if (movie.favorito == 0) {
      movie.favorito = 1;
    } else {
      movie.favorito = 0;
    }
    await movie.save();

    req.io.emit("movieFavorite", movie);

    return res.json(movie);
  }
};
