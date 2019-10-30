const express = require("express");
const multer = require("multer");
const uploadConfig = require("./config/upload");

const MovieController = require("./controllers/MovieController");
const FavoriteMovieController = require("./controllers/FavoriteMovieController");
const WatchedMovieController = require("./controllers/WatchedMovieController");
const LaterMovieController = require("./controllers/LaterMovieController");

const SerieController = require("./controllers/SerieController");
const FavoriteSerieController = require("./controllers/FavoriteSerieController");
const WatchedSerieController = require("./controllers/WatchedSerieController");
const LaterSerieController = require("./controllers/LaterSerieController");

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.post("/movies", upload.single("thumbnail"), MovieController.store);
routes.get("/movies", MovieController.index);
routes.post("/movies/:id/favorite", FavoriteMovieController.store);
routes.post("/movies/:id/watched", WatchedMovieController.store);
routes.post("/movies/:id/later", LaterMovieController.store);
routes.post("/movies/:id/delete", MovieController.destroy);

routes.post("/series", upload.single("thumbnail"), SerieController.store);
routes.get("/series", SerieController.index);
routes.post("/series/:id/favorite", FavoriteSerieController.store);
routes.post("/series/:id/watched", WatchedSerieController.store);
routes.post("/series/:id/later", LaterSerieController.store);
routes.post("/series/:id/delete", SerieController.destroy);

module.exports = routes;
